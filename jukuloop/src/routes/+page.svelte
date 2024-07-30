<script lang="ts">
    import {onMount} from "svelte";
    import type {Deck, Sentence} from "../types/Sentence";
    import EditDeckView from "../views/EditDeckView.svelte";
    import EditCardView from "../views/EditCardView.svelte";
    import DecksView from "../views/DecksView.svelte";
    import ReviewPageView from "../views/ReviewPageView.svelte";

    let decks: Deck[] = []

    let selectedDeck: Deck | null = null
    let selectedCard: Sentence | null = null

    let view: "review" | "decks" | "edit-deck" | "edit-card" = "review"

    const switchView = (to: "review" | "decks" | "edit-deck" | "edit-card") => {
        view = to
    }
    onMount(() => {
        const loadedDecks = localStorage.getItem("decks")
        decks = loadedDecks ? JSON.parse(loadedDecks) : []
    })
</script>

<div class="container">
    {#if view === "decks"}
        <DecksView bind:decks={decks}
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
        <EditDeckView bind:deck={selectedDeck}
                      on:edit={(e) => {
                        selectedCard = e.detail.sentence
                        switchView("edit-card")
                    }}
                      on:navigate={(e) => {
                    const to = e.detail.to
                    selectedDeck = null
                     switchView(to)
                }}/>
    {/if}
    {#if view === "edit-card" && selectedDeck && selectedCard}
        <EditCardView
                bind:deck={selectedDeck}
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
    {#if view === "review"}
        <ReviewPageView
                bind:decks={decks}
                on:navigate={(e) => {const to = e.detail.to
                 switchView(to)
                }}/>
    {/if}
</div>

<style>
    .container {
        padding-bottom: 5em;
    }
</style>