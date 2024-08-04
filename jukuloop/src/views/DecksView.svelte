<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import Navigation from "../components/Navigation.svelte";
    import type { Crud, DeckMetadata } from "../db/crud";

    const dispatch = createEventDispatcher();

    export let decks: DeckMetadata[] = [];
    export let storage: Crud;

    function addDeck() {
        const name = prompt("Enter the name of the deck");
        const description = prompt("Enter the description of the deck");
        if (name && description) {
            const id = Math.random().toString(36).substring(7);
            const deck: DeckMetadata = { id, name, description, sentenceIds: [] };
            storage.addOrUpdateDeck(deck);
            decks = storage.getDecks();
        }
    }

    function deleteDeck(deckId: string) {
        if (confirm("Are you sure you want to delete this deck?")) {
            storage.deleteDeck(deckId);
            decks = storage.getDecks();
        }
    }

    onMount(() => {
        // Any initialization logic can go here
    });
</script>

<div class="decks-view">
    <h1>Decks</h1>

    <div class="deck-list">
        {#each decks as deck (deck.id)}
            <div class="deck-card">
                <h2>{deck.name} ({deck.sentenceIds.length})</h2>
                <p>{deck.description}</p>
                <div class="deck-actions">
                    <button class="edit-button" on:click={() => dispatch("edit", { deck })}>
                        Edit
                    </button>
                    <button class="delete-button" on:click={() => deleteDeck(deck.id)}>
                        Delete
                    </button>
                </div>
            </div>
        {/each}
    </div>

    <button class="add-deck-button" on:click={addDeck}>Add Deck</button>

    <Navigation
        view={[
            { to: "review", label: "Review", active: true },
            { to: "decks", label: "Edit Decks", active: false }
        ]}
        on:navigate={(e) => dispatch("navigate", { to: e.detail.to })}
    />
</div>

<style>
    .decks-view {
        padding: 1rem;
    }

    .deck-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .deck-card {
        background-color: #f0f0f0;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .deck-card h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .deck-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }

    .edit-button {
        background-color: #4CAF50;
        color: white;
    }

    .delete-button {
        background-color: #f44336;
        color: white;
    }

    .add-deck-button {
        background-color: #2196F3;
        color: white;
        margin-bottom: 1rem;
    }
</style>