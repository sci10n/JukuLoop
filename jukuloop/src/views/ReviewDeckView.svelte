<script lang="ts">
    import * as wanakana from "wanakana";

    import ColoredReading from "../components/ColoredReading.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import SrsPopup from "../components/SrsPopup.svelte";
    import {adjust_srs, pick_sentences, type Stage} from "../types/Srs";
    import {type Deck, type Sentence} from "../types/Sentence";
    import {calculateMostLikelyCorrectness} from "../utils/conversionUtils";
    import {getParts} from "../types/Sentence.js";

    export let selectedDeck: Deck | null = null

    const dispatch = createEventDispatcher()

    let kanjiInputField: HTMLInputElement
    let currentAnswer = ""
    let answerLockedIn = false

    let invalidInput = false
    let notification = ""

    let showPopup = false;
    let newSrsLevel: Stage;
    let lastSrsLevel: Stage;

    let hasAdjustedSrs = false

    $: selectedSentences = selectedDeck ? pick_sentences(selectedDeck) as Sentence[] : []
    $: if (selectedDeck) {
        pickSentence()
    }

    const pickSentence = () => {
        if (selectedSentences.length > 0) {
            selectedSentences = selectedDeck ? pick_sentences(selectedDeck) as Sentence[] : []
            console.log("Number of sentences: " + selectedSentences.length)
            if (selectedSentences.length === 0) {
                currentSentence = null
                return
            }
            currentSentence = selectedSentences[Math.floor(Math.random() * selectedSentences.length)]
        }

        focusInput()
    }

    const resetAnswer = () => {
        currentAnswer = ""
        if (kanjiInputField) kanjiInputField.value = ""
        answerLockedIn = false
    }

    const lockInAnswer = () => {
        answerLockedIn = true

        const srs = currentSentence?.srs
        if (srs && !hasAdjustedSrs) {
            const new_srs = adjust_srs(srs, answerCorrect)
            newSrsLevel = new_srs.stage
            lastSrsLevel = srs.stage
            showPopup = true
            dispatch('srs', {
                sentence: currentSentence,
                srs: new_srs
            })
        }
    }

    const focusInput = () => {
        kanjiInputField && kanjiInputField.focus()
    }

    const validateInput = (input: string) => {
        if (input === "") {
            invalidInput = true
            notification = "Input cannot be empty!"
            return
        }

        const invalidChars = /[a-zA-Z0-9]/;
        invalidInput = invalidChars.test(input)
        notification = invalidInput ? "Invalid characters in input!" : ""
    }

    let currentSentence: Sentence | null = null

    $: if (currentSentence) {
        hasAdjustedSrs = false
    }

    $: correctness = currentAnswer && currentSentence && calculateMostLikelyCorrectness(currentAnswer, currentSentence, getParts(currentSentence))
    $: answerCorrect = correctness && correctness.answerCorrect

    const calculateColors = (readingCorectness: (boolean | null)[], referenceSentence: Sentence) => {
        let colors = referenceSentence.reading.map(() => 'black')
        readingCorectness.forEach((correct, index) => {
            if (correct === null) {
            }
            if (correct === true) {
                colors[index] = ' #94f77e'
            }
            if (correct === false) {
                colors[index] = '#f25f44'
            }
        })
        return colors
    }

    $: readingColors = currentSentence && currentAnswer && currentSentence && calculateColors(correctness.readingCorrectness, currentSentence)

    $: if (kanjiInputField) {
        kanjiInputField.value = ""
        kanjiInputField && wanakana.bind(kanjiInputField)
        kanjiInputField.addEventListener('input', (event) => {
            currentAnswer = ((event.target as HTMLInputElement).value).split("").filter((it) => it !== " ").join("")

        })
        focusInput()
    }


    onMount(() => {
        pickSentence()
        const inputContainer = document.querySelector('.input-container');
        if (inputContainer) {
            inputContainer.addEventListener('touchstart', () => {
                if (selectedDeck && currentSentence && answerLockedIn) {
                    resetAnswer()
                    pickSentence()
                }
            });
        }
        window.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                validateInput(currentAnswer)
                if (invalidInput) {
                    return
                }
                if (selectedDeck && currentSentence && answerLockedIn) {
                    resetAnswer()
                    pickSentence()
                } else {
                    lockInAnswer()
                }
            }
        })
    })

</script>

{#if currentSentence === null}
    <h1>No sentences to review</h1>
    <p class="centered">Try adding some sentences to the deck or select a different deck</p>
{/if}

{#if currentSentence}
    <h1>{currentSentence.translation}</h1>

    <div class="hint-container">
        <p>{currentSentence.hint}</p>
    </div>

    {#if showPopup}
        <SrsPopup stage={newSrsLevel} animateUp={newSrsLevel > lastSrsLevel} on:hide={() => showPopup = false}/>
    {/if}
    <div class="input-container">
        <input type="text" bind:this={kanjiInputField}/>
    </div>

    {#if notification}
        <div class="notification">{notification}</div>
    {/if}

    {#if answerLockedIn}
        <div class="sentence-container">
            {#if currentSentence}
                <ColoredReading
                        readings={currentSentence.reading}
                        furigana={currentSentence.furigana}
                        colors={readingColors}
                />
            {/if}
        </div>
        {#if currentSentence.note}
            <div class="note-container">
                <p>{currentSentence.note}</p>
            </div>
        {/if}
        <div class="result-container">
            {#if correctness}
                {#if correctness.answerCorrect}
                    <p class="correct">Correct!</p>
                {:else}
                    <p class="incorrect">Incorrect!</p>
                {/if}
            {/if}
        </div>
    {/if}

{/if}

<style>
    .centered {
        text-align: center;
    }

    h1 {
        color: white;
        text-align: center;
        padding-top: 1em;
    }

    p {
        color: white;
    }

    input {
        width: 60%;
        border-style: solid;
        border-radius: 5em;
        border-color: var(--border-color, black);
        background: var(--background-color, white);
        color: var(--font-color, #000000);
        font-size: 1.5em;
        margin-bottom: 1em;
    }

    .input-container {
        text-align: center;
    }

    .input-container input {
        width: 60%;
        border-style: solid;
        border-radius: 5em;
        background: #e8e8e8;
        font-size: 1.5em;
        margin-bottom: 1em;
    }

    .sentence-container {
        margin-left: 20%;
        margin-right: 20%;
    }

    .result-container {
        text-align: center;
    }

    .hint-container {
        text-align: center;
        margin-top: 0.5em;
        color: white;
    }

    .note-container {
        text-align: center;
        margin-top: 0.3em;
        color: white;
    }

    @media (max-width: 767px) {
        .sentence-container {
            margin-left: 5%;
            margin-right: 5%;
        }

        .input-container input {
            width: 90%;
        }

    }

    .notification {
        color: #f25f44;
        text-align: center;
        margin-top: 0.5em;
    }

    .correct {
        color: #94f77e;
    }

    .incorrect {
        color: #f25f44;
    }
</style>