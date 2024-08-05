<script lang="ts">
    import {onMount} from "svelte";
    import {adjust_srs, pick_sentences, Stage} from "../types/Srs";
    import Navigation from "../components/Navigation.svelte";
    import {createStorage, type Crud, type DeckMetadata} from "../db/crud";
    import type {Sentence} from "../types/Sentence";
    import {base} from "$app/paths";
    import * as wanakana from "wanakana";
    import ColoredReading from "../components/ColoredReading.svelte";
    import SrsPopup from "../components/SrsPopup.svelte";
    import {calculateMostLikelyCorrectness} from "../utils/conversionUtils";
    import {getParts} from "../types/Sentence.js";

    let storage: Crud;
    let decks: DeckMetadata[] = [];
    let selectedDeck: DeckMetadata | null = null;
    let currentSentence: Sentence | null = null;
    let kanjiInputField: HTMLInputElement;
    let currentAnswer = "";
    let answerLockedIn = false;
    let showPopup = false;

    let currentSrsLevel: Stage
    let lastSrsLevel: Stage

    $: selectedSentences = selectedDeck
        ? pick_sentences(storage.getSentencesForDeck(selectedDeck.id))
        : [];

    $: if (selectedSentences) {
        console.log(selectedSentences)
        currentSentence = selectedSentences[Math.floor(Math.random() * selectedSentences.length)]
    }
    $: correctness = currentAnswer && currentSentence &&
        calculateMostLikelyCorrectness(currentAnswer, currentSentence, getParts(currentSentence));
    $: answerCorrect = correctness?.answerCorrect;

    onMount(() => {
        storage = createStorage()
        decks = storage.getDecks();
        window.addEventListener('keydown', handleKeydown);
    });

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if (answerLockedIn) {
                resetAndPickNewSentence();
            } else {
                lockInAnswer();
            }
        }
    }

    function resetAndPickNewSentence() {
        currentAnswer = "";
        answerLockedIn = false;
        kanjiInputField.value = ""
        pickSentence();
        kanjiInputField.focus()
    }

    function pickSentence() {
        currentSentence = selectedSentences.length > 0
            ? selectedSentences[Math.floor(Math.random() * selectedSentences.length)]
            : null;
        kanjiInputField?.focus();
    }

    function lockInAnswer() {
        answerLockedIn = true;
        if (currentSentence?.srs) {
            const newSrs = adjust_srs(currentSentence.srs, answerCorrect);
            showPopup = true;
            storage.addOrUpdateSrs(currentSentence.id, newSrs);
            currentSentence.srs = newSrs;
            currentSrsLevel = newSrs.stage;
            lastSrsLevel = currentSentence.srs.stage;
        }
    }

    function handleInputBinding(node: HTMLInputElement) {
        wanakana.bind(node);
        node.addEventListener('input', (event) => {
            currentAnswer = (event.target as HTMLInputElement).value.replace(/\s/g, "");
        });
    }

    function calculateColors(correctness) {
        if (!correctness) {
            return currentSentence!.reading.map((it, i) => currentSentence!.optional[i] ? 'blue' : 'black')
        }

        return currentSentence!.reading.map((it, i) =>
            correctness.readingCorrectness[i] === true ? '#0a7141' :
                correctness.readingCorrectness[i] === false ? '#D81B60' :
                    currentSentence!.optional[i] ? 'blue' : 'black'
        );
    }

    function dispatch(navigate: string, param2: { to: string }) {
        return false;
    }
</script>

<div class="container">
    {#if decks.length === 0}
        <h1>No decks found. <a href="{base}/edit">Create a deck</a></h1>
    {:else if !selectedDeck}
        <div class="pick-decks-container">
            <h1>Choose a deck</h1>
            <select bind:value={selectedDeck}>
                {#each decks as deck}
                    <option value={deck}>
                        {deck.name} ({pick_sentences(storage.getSentencesForDeck(deck.id)).length}
                        /{storage.getSentencesForDeck(deck.id).length})
                    </option>
                {/each}
            </select>
        </div>
    {:else if !currentSentence}
        <h1>No sentences to review</h1>
        <p class="centered">
            Try adding some sentences to the deck or
            <button class="flat" on:click={() => selectedDeck = null}> select a different deck</button>
        </p>
    {:else}
        <h1>{currentSentence.translation}</h1>
        <p class="hint">{currentSentence.hint}</p>

        {#if showPopup}
            <SrsPopup stage={currentSrsLevel} animateUp={currentSrsLevel > lastSrsLevel}
                      on:hide={() => showPopup = false}/>
        {/if}

        <input type="text" bind:this={kanjiInputField} use:handleInputBinding/>

        {#if answerLockedIn}
            <div class="sentence">
                <ColoredReading
                        readings={currentSentence.reading}
                        furigana={currentSentence.furigana}
                        colors={calculateColors(correctness)}
                />
            </div>
            {#if currentSentence.note}
                <p class="note">{currentSentence.note}</p>
            {/if}
            <p class={answerCorrect ? "correct" : "incorrect"}>
                {answerCorrect ? "Correct!" : "Incorrect!"}
            </p>
        {/if}
    {/if}
</div>

<Navigation
        view={[{to: " ", label: " ", active: false}, {to: "decks", label: "Edit Decks", active: true}]}
        on:navigate={(e) => {
            if(e.detail.to === "decks")
                window.location.href = `${base}/edit`
            }
        }
/>


<style>
    :global(body) {
        background: #353634;
        font-family: 'Roboto', sans-serif;
    }

    .container {
        background: #f2e3c6;
        margin-right: 20%;
        margin-left: 20%;
        padding: 1em 1em 2em;
        border: black 1px solid;
        border-radius: 1em;
        box-shadow: #00000057 0.3em 0.3em 0.36em;
        margin-top: 5em;
    }

    @media (max-width: 1024px) {
        .container {
            margin-right: 1%;
            margin-left: 1%;
        }
    }

    h1 {
        text-align: center;
    }

    h2 {
        text-align: center;
    }

    p {
        text-align: center;
    }

    select {
        width: 100%;
        font-size: 1.1em;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    input {
        width: 95%;
        font-size: 1.1em;
        text-align: center;
        margin-right: 2%;
        margin-left: 2%;
    }

    .sentence {
        padding-top: 1em;
        text-align: center;
    }

    .correct {
        color: #0a7141;
    }

    .incorrect {
        color: #D81B60;
    }

    .flat {
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        flex: 1; /* Allow buttons to grow and take equal space */
        margin: 5px; /* Add some margin between buttons */
    }
</style>