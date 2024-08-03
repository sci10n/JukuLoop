<script lang="ts">
    import {onMount} from "svelte";
    import ReviewPageView from "../views/ReviewPageView.svelte";
    import {base} from "$app/paths";
    import {createStorage, type Crud, type DeckMetadata} from "../db/crud";

    let storage: Crud
    let decks: DeckMetadata[] = []

    let view: "review" | "decks" | "edit-deck" | "edit-card" = "review"
    const switchView = (to: "review" | "decks" | "edit-deck" | "edit-card") => {
        view = to
        if (view !== "review" && window) {
            window.location.href = `${base}/edit`
        }

    }
    onMount(() => {
        storage = createStorage()
        decks = storage.getDecks()
        console.log(decks)
    })
</script>

<div class="container">
    <ReviewPageView
            storage={storage}
            decks={decks}
            on:navigate={(e) => {
                    const to = e.detail.to
                       switchView(to)
                }}/>
</div>

<style>
    .container {
        padding-bottom: 5em;
    }
</style>