<script lang="ts">

    import type {Deck, Sentence} from "../types/Sentence";
    import {onMount} from "svelte";
    import Review from "./Review.svelte";
    import type {SRS} from "../types/Srs";

    let decksStore: Deck[] = []
    let selectedDeck: Deck | null


    $: showCreateDeck = decksStore.length === 0
    $: showDecksView = decksStore.length > 0
    $: showReviewView = selectedDeck !== null

    const saveDecks = (sentence: Sentence, new_srs: SRS) => {
        const _currentDeck: Deck = selectedDeck as Deck
        const _currentSentence: Sentence = sentence

        const deckIndex = decksStore.findIndex(deck => deck === _currentDeck)
        const sentenceIndex = _currentDeck.sentences.findIndex(sentence => sentence === _currentSentence)

        console.log(deckIndex, sentenceIndex)
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
    })
</script>

<div class="page">
    <div class="container">
        {#if showCreateDeck}
            <h1>No Decks</h1>
            <p>Create a deck by going to <a href="/deck">/deck</a></p>
        {/if}
        {#if showDecksView || showReviewView}
            <form>
                <label for="decks">Choose a deck:</label>
                <select name="decks" id="decks" bind:value={selectedDeck} on:change={ () => console.log(selectedDeck) }>
                    {#each decksStore as deck, i}
                        <option value={deck}>{deck.name}</option>
                    {/each}
                </select>
            </form>

            {#if showReviewView}
                <Review bind:selectedDeck={selectedDeck} on:srs={(event) => {
                    saveDecks(event.detail.sentence, event.detail.srs)
                }}/>
            {/if}
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


</style>