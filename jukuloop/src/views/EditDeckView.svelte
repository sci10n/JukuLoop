<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import type {Deck, Sentence} from "../types/Sentence";
    import {get_review_text, type SRS, Stage} from "../types/Srs";
    import SrsStage from "../components/SrsStage.svelte";
    import ColoredReading from "../components/ColoredReading.svelte";

    const dispatch = createEventDispatcher()

    export let deck: Deck

    const deleteSentence = (sentence: Sentence) => {
        deck.sentences = deck.sentences.filter(it => it.id !== sentence.id)
        updateDeck(deck)
    }

    const addSentence = () => {
        deck.sentences = [...deck.sentences, {
            id: Math.random().toString(36).substring(7),
            raw: "",
            reading: [],
            furigana: [],
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
        }]
        updateDeck(deck)
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
        <button class="primary" on:click={() => {dispatch("back")}}>Back</button>
        <button class="primary" on:click={addSentence}>Add sentence</button>
        <table class="deck-table">
            <colgroup>
                <col class="reading"/>
                <col class="translation"/>
                <col class="note"/>
                <col class="hint"/>
                <col class="srs"/>
                <col class="actions"/>
            </colgroup>
            <thead>
            <tr>
                <th>Sentence</th>
                <th>Translation</th>
                <th>Notes</th>
                <th>Hint</th>
                <th>Stage</th>
                <th>Review</th>
                <th>Actions</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {#each deck.sentences as sentence, i}
                <tr>
                    <td class="reading" data-label="Sentence">
                        <ColoredReading readings={sentence.reading} furigana={sentence.furigana}
                                        colors={sentence.reading.map(it => "black")}/>
                    </td>
                    <td data-label="Translation">
                        <p>{sentence.translation}</p>
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
                        <button class="primary" on:click={() => {dispatch("edit", {deck: deck, sentence: sentence})}}>Edit</button>
                        <button class="primary" on:click={() => {
                            sentence.srs = {
                                stage: Stage.Apprentice1,
                                lastReviewed: new Date(),
                                nextReview: new Date(),
                                streak: 0,
                                maxStreak: 0
                            }
                            updateDeck(deck)
                          }}>
                            Reset
                        </button>
                    </td>
                    <td>
                        <div class="delete-button">
                            <button class="red" on:click={() => {deleteSentence(sentence)}}>Delete</button>
                        </div>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
</div>

<style>
    @import "../styles/table.css";
    @import "../styles/button.css";

    .delete-button {
        text-align: left;
    }
</style>