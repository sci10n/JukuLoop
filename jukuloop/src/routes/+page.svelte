<script lang="ts">
    import { base } from '$app/paths';
    import {type Deck, placeholderSentence, type Sentence} from "../types/Sentence";
    import {onMount} from "svelte";
    import Review from "./Review.svelte";
    import type {SRS} from "../types/Srs";

    let decksStore: Deck[] = []
    let selectedDeck: Deck | null


    $: showCreateDeck = decksStore.length === 0
    $: showDecksView = decksStore.length > 0 && selectedDeck === null
    $: showReviewView = selectedDeck !== null

    const saveDecks = (sentence: Sentence, new_srs: SRS) => {
        const _currentDeck: Deck = selectedDeck as Deck
        const _currentSentence: Sentence = sentence

        const deckIndex = decksStore.findIndex(deck => deck === _currentDeck)
        const sentenceIndex = _currentDeck.sentences.findIndex(sentence => sentence === _currentSentence)

        deckIndex !== -1 && sentenceIndex !== -1 && console.log(_currentDeck.sentences[sentenceIndex])
        if (deckIndex !== -1) {
            if (sentenceIndex !== -1) {
                _currentDeck.sentences[sentenceIndex] = {
                    ..._currentSentence,
                    srs: new_srs
                }
                decksStore[deckIndex] = _currentDeck
            }
        }
        localStorage.setItem('decks', JSON.stringify(decksStore))
    }

    onMount(() => {
        const storedDecks = localStorage.getItem('decks')
        if (storedDecks) {
            decksStore = JSON.parse(storedDecks)
        }

        if (!storedDecks || decksStore.length == 0) {
            decksStore = [
                {
                    name: "Default Deck",
                    description: "This is a default deck",
                    sentences: [
                        placeholderSentence
                    ]
                }
            ]
        }
    })
</script>

<div class="page">
    {#if showReviewView}
        <form>
            <label for="decks">Choose a deck:</label>
            <select name="decks" id="decks" bind:value={selectedDeck} on:change={ () => console.log(selectedDeck) }>
                {#each decksStore as deck, i}
                    <option value={deck}>{deck.name}</option>
                {/each}
            </select>
        </form>
        <p><a href={`${base}/decks`}>Manage Decks</a></p>
    {/if}
    <div class="container">
        {#if showDecksView }
            <div class="pick-decks-container">
                <h1>Choose a deck</h1>
                <form>
                    <select name="decks" id="decks" bind:value={selectedDeck}
                            on:change={ () => console.log(selectedDeck) }>
                        {#each decksStore as deck, i}
                            <option value={deck}>{deck.name}</option>
                        {/each}
                    </select>
                </form>
            </div>
        {/if}
        {#if showReviewView}
            <Review bind:selectedDeck={selectedDeck} on:srs={(event) => {
                    saveDecks(event.detail.sentence, event.detail.srs)
                }}/>
        {/if}
    </div>
</div>

<style>
    :global(body) {
        background: #22221f;
        color: white;
    }

    h1 {
        color: white;
        text-align: center;
        padding-top: 1em;
    }

    .container {
        width: 600px;
        background: #2c2b29;
        box-shadow: .3rem .3rem .36rem #1c1c1c;
        border-radius: 1em;
        margin-top: 10%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    .pick-decks-container {
        text-align: center;
    }

    .pick-decks-container select {
        margin-left: auto;
        margin-right: auto;

        width: 50%;
        border-style: solid;
        border-radius: 5em;
        border-color: var(--border-color, black);
        background: var(--background-color, white);
        color: var(--font-color, black);
        font-size: 1.0em;
        margin-bottom: 1em;

    }


</style>