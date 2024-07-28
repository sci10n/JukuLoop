<script lang="ts">

    import {type Deck, placeholderDeck} from "../../types/Sentence";
    import {onMount} from "svelte";
    import DeckTable from "../../components/DeckTable.svelte";

    export let decks: Deck[] = []

    const addDeck = () => {
        decks = [...decks, placeholderDeck]
    }

    const saveDecks = () => {
        localStorage.setItem("decks", JSON.stringify(decks))
    }

    const deleteDeck = (index: number) => {
        decks = decks.filter((_, i) => i !== index)
    }

    const updateDeck = (deck: Deck, index: number) => {
        decks[index] = deck
    }

    onMount(() => {
        const loadedDecks = localStorage.getItem("decks")
        decks = loadedDecks ? JSON.parse(loadedDecks) : []
        console.log(decks)
    })
</script>

<style>
        :global(body) {
        background: #22221f;
        color: white;
    }
</style>
<div class="container">
    <h1>Decks</h1>
      <button on:click={addDeck}>Add Deck</button>
                    <button on:click={saveDecks}>Save Decks</button>
    <div class="decks">
        {#each decks as deck, i}
            <DeckTable deck={deck} editable={true}
                       on:message={deck => updateDeck(deck.detail.deck, i)}
                       on:delete={deck => deleteDeck(i)}
                       --border-color="#22221f"
                       --deck-color="#22221f"
                       --background-color="#2c2b29"
            />
        {/each}
    </div>
</div>
