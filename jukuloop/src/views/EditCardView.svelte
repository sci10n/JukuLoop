<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import type {Crud, DeckMetadata} from "../db/crud";
    import type {Sentence} from "../types/Sentence";
    import {parseJapaneseSentence, processComponents} from "../utils/conversionUtils";
    import {cleanupInput} from "../utils/misc";
    import {get_review_text, stages} from "../types/Srs";
    import KanjiInput from "../components/KanjiInput.svelte";
    import ColoredReading from "../components/ColoredReading.svelte";
    import {stage_name} from "../utils/srs";
    import Navigation from "../components/Navigation.svelte";

    const dispatch = createEventDispatcher();

    export let deck: DeckMetadata | null = null;
    export let sentence: Sentence;
    export let storage: Crud;

    function updateSentence(field: string, value: string) {
        if (field === 'raw') {
            const cleaned = value.split("").map(cleanupInput).join("");
            const components = parseJapaneseSentence(cleaned);
            const { reading, furigana, optional, optionalCluster } = processComponents(components);

            sentence = {
                ...sentence,
                raw: cleaned,
                reading,
                furigana,
                optional,
                optionalCluster
            };
        } else {
            sentence = { ...sentence, [field]: value };
        }
    }

    const deleteSentence = () => {
        if (confirm("Are you sure you want to delete this sentence?")) {
            if (deck) {
                storage.removeSentenceFromDeck(deck.id, sentence.id);
            }
            storage.deleteSentence(sentence.id);
            dispatch("cancel");
        }
    }

    function resetSRS() {
        sentence.srs = {
            ...sentence.srs!,
            streak: 0,
            maxStreak: 0,
            stage: stages[0],
            nextReview: new Date(),
        };
    }

    function saveSentence() {
        storage.addOrUpdateSentence(sentence);
        if (deck) {
            storage.addSentenceToDeck(deck.id, sentence.id);
        }
        dispatch("edit", { deck, sentence });
    }
</script>

<div class="edit-container">
    <h1>Edit Sentence</h1>

    <div class="sentence-input">
        <KanjiInput value={sentence.raw} on:input={e => updateSentence('raw', e.detail)} />
        <ColoredReading
            readings={sentence.reading}
            furigana={sentence.furigana}
            colors={sentence.optional.map(it => it ? "blue" : "black")}
        />
    </div>

    <div class="form-grid">
        <label>
            Translation
            <input bind:value={sentence.translation} on:input={e => updateSentence('translation', e.target.value)} />
        </label>

        <label>
            Notes
            <textarea bind:value={sentence.note} on:input={e => updateSentence('note', e.target.value)}></textarea>
        </label>

        <label>
            Hint
            <textarea bind:value={sentence.hint} on:input={e => updateSentence('hint', e.target.value)} />
        </label>

        <label>
            SRS Stage
            <select bind:value={sentence.srs.stage}>
                {#each stages as stage}
                    <option value={stage}>{stage_name(stage)}</option>
                {/each}
            </select>
        </label>
        <label>
            Time until Review: {get_review_text(sentence.srs)}
            <button class="reset-btn" on:click={resetSRS}>Reset SRS</button>
        </label>
        <label>
            Delete
            <button class="reset-btn" on:click={deleteSentence}>Delete Sentence</button>
        </label>

    </div>

    <Navigation
        view={[
            { to: "cancel", label: "Cancel", active: true },
            { to: "save", label: "Save", active: true }
        ]}
        on:navigate={e => e.detail.to === "save" ? saveSentence() : dispatch("cancel")}
    />
</div>

<style>
    .edit-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }

    .sentence-input {
        margin-bottom: 1rem;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input, select, textarea, button {
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    textarea {
        height: 100px;
    }

    .reset-btn {
        background-color: #ff4136;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }
</style>