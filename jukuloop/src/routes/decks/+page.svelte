<script lang="ts">
    import {onMount} from "svelte";
    import type {Deck, Sentence} from "../../types/Sentence";
    import {base} from "$app/paths";
    import EditDeckView from "../../views/EditDeckView.svelte";
    import EditCardView from "../../views/EditCardView.svelte";

    let decks: Deck[] = []

    let selectedDeck: Deck | null = null
    let selectedCard: Sentence | null = null

    let showDecksView = true
    let showDeckView = false
    let showEditCardView = false

    const addDeck = () => {
        const name = prompt("Enter the name of the deck")
        const description = prompt("Enter the description of the deck")
        const id = Math.random().toString(36).substring(7)
        decks.push({id, name, description, sentences: []})
        localStorage.setItem("decks", JSON.stringify(decks))
        decks = decks
    }

    const deleteDeck = (deck: Deck) => {
        decks = decks.filter(it => it.id !== deck.id)
        localStorage.setItem("decks", JSON.stringify(decks))
    }

    onMount(() => {
        const loadedDecks = localStorage.getItem("decks")
        decks = loadedDecks ? JSON.parse(loadedDecks) : []
    })
</script>

<div class="container">
    {#if showDecksView}
        <h1>Decks</h1>
        <div>
            <button class="primary" on:click={() => window.location.href = `${base}/`}>Back</button>
            <button class="primary" on:click={() => addDeck()}>Add deck</button>
        </div>
        <table class="deck-table">
            <colgroup>
                <col class="name"/>
                <col class="description"/>
                <col class="actions"/>
            </colgroup>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Edit</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {#each decks as deck, i}
                <tr>
                    <td class="name" data-label="Name">
                        {deck.name}
                    </td>
                    <td data-label="Description">
                        <p>{deck.description}</p>
                    </td>
                    <td data-label="Actions">
                        <button class="primary" on:click={() => {selectedDeck = deck; showDecksView = false; showDeckView = true}}>
                            Edit
                        </button>
                    </td>
                    <td>
                        <button class="red" on:click={() => {deleteDeck(deck)}}>Delete</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
    {#if showDeckView && selectedDeck}
        <EditDeckView bind:deck={selectedDeck}
                      on:edit={(e) => {
                        selectedCard = e.detail.sentence
                        showEditCardView = true
                        showDeckView = false
                        showDecksView = false
                    }}
                      on:back={() => {
                        showDecksView = true
                        showDeckView = false
                        selectedDeck = null
                        selectedCard = null
                    }}/>
    {/if}
    {#if showEditCardView && selectedDeck && selectedCard}
        <EditCardView
                bind:deck={selectedDeck}
                bind:sentence={selectedCard}
                on:edit={(e) => {
                    showDeckView = true
                    showEditCardView = false
                    showDecksView = false
                    selectedCard = null
                }}
                on:back={() => {
                    showDeckView = true
                    showEditCardView = false
                    showDecksView = false
                    selectedCard = null
                    }}
        />
    {/if}
</div>
<style>
    @import "../../styles/table.css";
    @import "../../styles/button.css";
</style>