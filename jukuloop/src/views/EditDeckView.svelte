<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import type {Deck, Sentence} from "../types/Sentence";
    import {get_review_text, type SRS, Stage} from "../types/Srs";
    import SrsStage from "../components/SrsStage.svelte";
    import ColoredReading from "../components/ColoredReading.svelte";
    import Navigation from "../components/Navigation.svelte";

    const dispatch = createEventDispatcher()

    export let deck: Deck

    const deleteSentence = (sentence: Sentence) => {
        deck.sentences = deck.sentences.filter(it => it.id !== sentence.id)
        updateDeck(deck)
    }

    const addSentence = () => {
        const sentence = {
            id: Math.random().toString(36).substring(7),
            raw: "",
            reading: [],
            furigana: [],
            optional: [],
            translation: "",
            note: "",
            hint: "",
            srs: {
                stage: Stage.Apprentice1,
                lastReviewed: new Date(),
                nextReview: new Date(),
                streak: 0,
                maxStreak: 0
            } as SRS
        }
        deck.sentences = [...deck.sentences, sentence]
        dispatch("edit", {deck: deck, sentence: sentence})
    }

    const updateDeck = (deck: Deck) => {
        const loadedDecks = localStorage.getItem("decks")
        const decks = loadedDecks ? JSON.parse(loadedDecks) : []

        const deckIndex = decks.findIndex(it => it.id === deck.id)
        decks[deckIndex] = deck

        localStorage.setItem("decks", JSON.stringify(decks))

        deck = deck
    }
    onMount(() => {
        const loadedDecks = localStorage.getItem("decks")
        const decks = loadedDecks ? JSON.parse(loadedDecks) : []

        deck = decks.find(it => it.id === deck.id)
    })
</script>

<div class="container">
    {#if !deck}
        <p>Deck not found</p>
    {/if}
    {#if deck}
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <table class="deck-table">
            <thead>
            <tr>
                <th></th>
                <th>Translation</th>
                <th>Sentence</th>
                <th>Notes</th>
                <th>Hint</th>
                <th>Stage</th>
                <th>Review</th>
                <th>Actions</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
          <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <button class="primary" on:click={() => addSentence()}>Add sentence</button>
                </td>
            </tr>
            {#each deck.sentences as sentence, i}
                <tr>
                    <td>
                            <button class="red delete-button" on:click={() => {deleteSentence(sentence)}}>Delete</button>
                    </td>
                    <td data-label="Translation">
                        <p>{sentence.translation}</p>
                    </td>
                    <td class="reading" data-label="Sentence">
                        <ColoredReading readings={sentence.reading} furigana={sentence.furigana}
                                        colors={sentence.reading.map(it => "black")}/>
                    </td>
                    <td data-label="Notes">
                        <p>{sentence.note}</p>
                    </td>
                    <td data-label="Hint">
                        <p>{sentence.hint}</p>
                    </td>
                    <td data-label="SRS Stage" class="srs-container">
                        {#if sentence.srs}
                            <SrsStage stage={sentence.srs.stage} srs={sentence.srs}/>
                        {/if}
                    </td>
                    <td data-label="SRS Stage" class="srs-container">
                        {#if sentence.srs}
                            <p>
                                { get_review_text(sentence.srs)}
                            </p>
                        {/if}
                    </td>
                    <td data-label="Actions">
                        <button class="primary" on:click={() => {dispatch("edit", {deck: deck, sentence: sentence})}}>
                            Edit
                        </button>
                    </td>
                </tr>
            {/each}

            </tbody>
        </table>
    {/if}
    <Navigation
        view={[{to: "review", label: "Review",  active: true}, {to: "decks", label: "Edit Decks", active: true}]}
            on:navigate={(e) => {
              const to = e.detail.to
              dispatch("navigate", {to: to})
            }}
    />
</div>

<style>
    @import "../styles/table.css";
    @import "../styles/button.css";
    .delete-button {
        display: flex;
        justify-content: flex-start;
    }
</style>