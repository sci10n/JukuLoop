<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import type {Sentence} from "../types/Sentence";
    import {get_review_text, Stage} from "../types/Srs";
    import SrsStage from "../components/SrsStage.svelte";
    import ColoredReading from "../components/ColoredReading.svelte";
    import Navigation from "../components/Navigation.svelte";
    import type {Crud, DeckMetadata} from "../db/crud";

    const dispatch = createEventDispatcher();

    export let deckMetadata: DeckMetadata;
    export let storage: Crud;

    let editName = deckMetadata.name;
    let editDescription = deckMetadata.description;

    $: sentences = deckMetadata && storage && storage.getSentencesForDeck(deckMetadata.id);

    function saveDeck() {
        deckMetadata.name = editName;
        deckMetadata.description = editDescription;
        storage.addOrUpdateDeck(deckMetadata);
        dispatch("navigate", {to: "decks"});
    }

    function addSentence() {
        const sentenceId = Math.random().toString(36).substring(7);
        const sentence: Sentence = {
            id: sentenceId,
            furigana: [],
            hint: "",
            note: "",
            optional: [],
            optionalCluster: [],
            raw: "",
            reading: [],
            srs: {
                stage: Stage.Apprentice1,
                nextReview: new Date(),
                lastReview: new Date(),
                streak: 0,
                maxStreak: 0
            },
            translation: ""
        };

        dispatch("edit", {deck: deckMetadata, sentence: sentence});
    }
</script>

<div class="container">
    {#if !deckMetadata}
        <p>Deck not found</p>
    {:else}
        <div class="deck-info">
            <input bind:value={editName} placeholder="Deck Name"/>
            <textarea bind:value={editDescription} placeholder="Deck Description"></textarea>
        </div>

        <table class="sentence-table">
            <thead>
            <tr>
                <th>Translation</th>
                <th>Sentence</th>
                <th>Notes</th>
                <th>Hint</th>
                <th>Stage</th>
                <th>Review</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each sentences as sentence (sentence.id)}
                <tr>
                    <td>{sentence.translation}</td>
                    <td class="reading">
                        <ColoredReading
                                readings={sentence.reading}
                                furigana={sentence.furigana}
                                colors={sentence.optional.map(it => it ? "blue" : "black")}
                        />
                    </td>
                    <td>{sentence.note}</td>
                    <td>{sentence.hint}</td>
                    <td class="srs-container">
                        {#if sentence.srs}
                            <SrsStage stage={sentence.srs.stage} srs={sentence.srs}/>
                        {/if}
                    </td>
                    <td>
                        {#if sentence.srs}
                            {get_review_text(sentence.srs)}
                        {/if}
                    </td>
                    <td>
                        <button class="primary"
                                on:click={() => dispatch("edit", {deck: deckMetadata, sentence: sentence})}>
                            Edit
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>

        <button class="primary add-sentence" on:click={addSentence}>Add Sentence</button>

        <Navigation
                view={[
            { to: "cancel", label: "Cancel", active: true },
            { to: "save", label: "Save", active: true }
        ]}
                on:navigate={e => e.detail.to === "save" ? saveDeck() : dispatch("cancel")}
        />
    {/if}
</div>

<style>
    .container {
        padding: 1rem;
    }

    .deck-info {
        margin-bottom: 2rem;
    }

    .deck-info input,
    .deck-info textarea {
        width: 100%;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
    }

    .sentence-table {
        width: 100%;
        border-collapse: collapse;
    }

    .sentence-table th,
    .sentence-table td {
        border: 0;
        padding: 0.5rem;
        text-align: left;
    }

    .sentence-table th {
        background-color: #f2f2f2;
    }

    .action-buttons {
        display: flex;
        justify-content: space-between;
    }

    .action-buttons button {
        padding: 0.25rem 0.5rem;
    }

    .add-sentence {
        margin-top: 1rem;
    }

    .reading {
        overflow-wrap: break-word;
    }

    .srs-container {
        text-align: center;
    }

    button {
        cursor: pointer;
    }

    button.primary {
        background-color: #4CAF50;
        color: white;
        border: none;
    }

    button.red {
        background-color: #f44336;
        color: white;
        border: none;
    }
</style>