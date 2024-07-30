<script lang="ts">
    import {createEventDispatcher} from "svelte";


    const dispatch = createEventDispatcher()

    export let view: {to, label, active}[] = []

    const navigateToReview = () => {
        dispatch("navigate", {to: "review"})
    }

    const navigateToDecks = () => {
        dispatch("navigate", {to: "decks"})
    }

</script>

<div class="bottom-navigation-bar button-container">
    {#each view as {to, label, active}}
        <button class="flat" on:click={() => dispatch("navigate", {to: to})} disabled={!active}>{label}</button>
    {/each}
</div>

<style>
    .flat {
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        flex: 1; /* Allow buttons to grow and take equal space */
        margin: 5px; /* Add some margin between buttons */
    }

    .bottom-navigation-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        padding: 1rem;
        background-color: white;
        border-top: 1px solid #ccc;
    }

    .bottom-navigation-bar button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
</style>