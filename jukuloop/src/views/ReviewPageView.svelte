<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {pick_sentences, type SRS} from "../types/Srs";
    import ReviewDeck from "../views/ReviewDeckView.svelte";
    import Navigation from "../components/Navigation.svelte";
    import type {Crud, DeckMetadata} from "../db/crud";
    import type {Sentence} from "../types/Sentence";

    const dispatch = createEventDispatcher()

    export let decks: DeckMetadata[] = []
    export let storage: Crud

    let selectedDeck: DeckMetadata | null = null

    $: if(decks) {
        console.log("Deck", decks)
        console.log("Selected Deck", selectedDeck)
    }
    $: sentencesInDecks = decks && storage && decks.map(deck => storage.getSentencesForDeck(deck.id))

    $: reviewsInDeck = decks.map((deck, i) => pick_sentences(sentencesInDecks[i]).length)
    $: sentencesInDeck = decks.map((deck, i) => (sentencesInDecks[i].length))

    $: showCreateDeck = decks.length === 0
    $: showDecksView = decks.length > 0 && !selectedDeck
    $: showReviewView = selectedDeck


    onMount(() => {

    })
</script>

<div class="page">
    <div class="container">
        {#if showDecksView }
            <div class="pick-decks-container">
                <h1>Choose a deck</h1>
                <form>
                    <select name="decks" id="decks" bind:value={selectedDeck}>
                        {#each decks as deck, i}
                            <option value={deck}>{deck.name}  ({reviewsInDeck[i]}/{sentencesInDeck[i]})</option>
                        {/each}
                    </select>
                </form>
            </div>
        {/if}
        {#if showReviewView && selectedDeck}
            <ReviewDeck storage={storage} bind:selectedDeck={selectedDeck}/>
        {/if}
    </div>
</div>

<Navigation
        view={[{to: " ", label: " ",  active: false}, {to: "decks", label: "Edit Decks", active: true}]}
        on:navigate={(e) => {
                const to = e.detail.to
                if (to === "review") {
                } else if (to === "decks") {
                    dispatch("navigate", {to: to})
                }
            }}
/>
<style>
    :global(body) {
        background: #fdfbfb;
        color: black
    }

    h1 {
        color: white;
        text-align: center;
        padding-top: 1em;
    }

    .container {
        background: #302f2f;
        box-shadow: .3rem .3rem .36rem #1c1c1c;
        border-radius: 1em;
        margin-top: 10%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    @media (min-width: 1200px) {
        .container {
            width: 800px;
        }
    }

    @media (max-width: 767px) {
        .container {
            width: 100%;
            margin-top: 0;
        }
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