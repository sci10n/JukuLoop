<script lang="ts">
    import {type Deck, placeholderSentence, type Sentence} from "../types/Sentence";
    import {createEventDispatcher, onMount} from "svelte";
    import {pick_sentences, type SRS} from "../types/Srs";
    import ReviewDeck from "../views/ReviewDeckView.svelte";
    import Navigation from "../components/Navigation.svelte";

    const dispatch = createEventDispatcher()

    let decksStore: Deck[] = []
    let selectedDeck: Deck | null

    $: reviewsInDeck = decksStore.map(deck => pick_sentences(deck).length)
    $: sentencesInDeck = decksStore.map(deck => deck.sentences.length)

    $: showCreateDeck = decksStore.length === 0
    $: showDecksView = decksStore.length > 0 && selectedDeck === null
    $: showReviewView = selectedDeck !== null

    const saveDecks = (sentence: Sentence, new_srs: SRS) => {
        const _currentDeck: Deck = selectedDeck as Deck
        const _currentSentence: Sentence = sentence

        const deckIndex = decksStore.findIndex(deck => deck === _currentDeck)
        const sentenceIndex = _currentDeck.sentences.findIndex(sentence => sentence === _currentSentence)

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
                    id: "placeholder",
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
    <div class="container">
        {#if showDecksView }
            <div class="pick-decks-container">
                <h1>Choose a deck</h1>
                <form>
                    <select name="decks" id="decks" bind:value={selectedDeck}>
                        {#each decksStore as deck, i}
                            <option value={deck}>{deck.name}  ({reviewsInDeck[i]}/{sentencesInDeck[i]})</option>
                        {/each}
                    </select>
                </form>
            </div>
        {/if}
        {#if showReviewView}
            <ReviewDeck bind:selectedDeck={selectedDeck} on:srs={(event) => {
                    saveDecks(event.detail.sentence, event.detail.srs)
                }}/>
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