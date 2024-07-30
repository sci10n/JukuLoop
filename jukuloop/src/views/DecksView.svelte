<script lang="ts">
    import {base} from '$app/paths';

    import {createEventDispatcher, onMount} from "svelte";
    import type {Deck} from "../types/Sentence";
    import Navigation from "../components/Navigation.svelte";

    const dispatch = createEventDispatcher()

    export let decks: Deck[] = []

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

<h1>Decks</h1>
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
            <td>
                <button class="red delete-button" on:click={() => {deleteDeck(deck)}}>Delete</button>
            </td>
            <td class="name" data-label="Name">
                {deck.name}
            </td>
            <td data-label="Description">
                <p>{deck.description}</p>
            </td>
            <td data-label="Actions">
                <button class="primary edit-button"
                        on:click={() => {
                            dispatch("edit", {deck: deck})
                        }}>
                    Edit
                </button>
            </td>
        </tr>
    {/each}
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <button class="primary edit-button" on:click={() => addDeck()}>Add deck</button>
        </td>
    </tr>
    </tbody>
</table>
<Navigation
        view={[{to: "review", label: "Review",  active: true}, {to: "decks", label: "Edit Decks", active: false}]}
        on:navigate={(e) => {
              const to = e.detail.to
              dispatch("navigate", {to: to})
            }}
/>
<style>
    @import "../styles/table.css";
    @import "../styles/button.css";

    .delete-button {
        display: flex;
        justify-content: flex-start;
    }
</style>