<script lang="ts">
    import {onMount} from "svelte";
    import type {Sentence} from "../../types/Sentence";
    import EditDeckView from "../../views/EditDeckView.svelte";
    import DecksView from "../../views/DecksView.svelte";
    import {base} from "$app/paths";
    import {createStorage, type Crud, type DeckMetadata} from "../../db/crud";
    import EditCardView from "../../views/EditCardView.svelte";

    let storage: Crud
    let decks: DeckMetadata[] = []

    let selectedDeck: DeckMetadata | null = null
    let selectedCard: Sentence | null = null

    let view: "review" | "decks" | "edit-deck" | "edit-card" = "decks"

    const switchView = (to: "review" | "decks" | "edit-deck" | "edit-card") => {
        view = to
        if (view === "review") {
            window.location.href = `${base}/`
        }
    }
    onMount(() => {
        storage = createStorage()
        decks = storage.getDecks()
    })
</script>

<div class="container">
    {#if view === "decks"}
        <DecksView bind:decks={decks}
                   storage={storage}
                   on:edit={(e) => {
                       selectedDeck = e.detail.deck
                       switchView("edit-deck")
                   }}
                   on:navigate={(e) => {
                    const to = e.detail.to
                     switchView(to)
                }}/>
    {/if}
    {#if view === "edit-deck" && selectedDeck}
        <EditDeckView
                bind:deckMetadata={selectedDeck}
                storage={storage}
                on:edit={(e) => {
                    selectedCard = e.detail.sentence
                    switchView("edit-card")
                }} on:cancel={(e) => {
                    selectedCard = null
                    selectedDeck = null
                    switchView("decks")
                }}
                on:navigate={(e) => {
                    const to = e.detail.to
                    switchView(to)
                }}
        />
    {/if}
    {#if view === "edit-card" && selectedDeck && selectedCard}
        <EditCardView
                bind:deck={selectedDeck}
                storage={storage}
                bind:sentence={selectedCard}
                on:edit={(e) => {
                    selectedCard = null
                    switchView("edit-deck")
                }}
                on:cancel={(e) => {
                    selectedCard = null
                    switchView("edit-deck")
                }}/>
    {/if}
</div>

<style>
    .container {
        padding-bottom: 5em;
    }
</style>