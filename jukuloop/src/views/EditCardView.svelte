<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {base} from "$app/paths";
    import type {Deck, Sentence} from "../types/Sentence";
    import {convertToFuriganaFormat} from "../utils/conversionUtils";
    import {Stage, stages} from "../types/Srs";
    import {stage_name} from "../utils/srs";
    import KanjiInput from "../components/KanjiInput.svelte";
    import ColoredReading from "../components/ColoredReading.svelte";
    import {cleanupInput} from "../utils/misc";

    const dispatch = createEventDispatcher()

    export let deck: Deck
    export let sentence: Sentence


    const updateRaw = (raw: string) => {
        sentence.raw = raw
        const converted = convertToFuriganaFormat(raw)
        sentence.reading = converted.reading
        sentence.furigana = converted.furigana

    }

    const updateTranslation = (translation: string) => {
        sentence.translation = translation
    }

    const updateNote = (note: string) => {
        sentence.note = note
    }

    const updateHint = (hint: string) => {
        sentence.hint = hint
        updateSentence(sentence)
    }

    const updateSrsStage = (stage: number) => {
        if (!sentence.srs) {
            return
        }
        sentence.srs.stage = stages[stage]
    }

    const updateSentence = (sentence: Sentence) => {

        updateRaw(cleanupInput(sentence.raw))
        const loadedDecks = localStorage.getItem("decks")
        const decks = loadedDecks ? JSON.parse(loadedDecks) : []

        const deckIndex = decks.findIndex(it => it.id === deck.id)
        const sentenceIndex = decks[deckIndex].sentences.findIndex(it => it.id === sentence.id)

        decks[deckIndex].sentences[sentenceIndex] = sentence

        localStorage.setItem("decks", JSON.stringify(decks))
        dispatch("edit", {deck: deck, sentence: sentence})
    }

    onMount(() => {
        const loadedDecks = localStorage.getItem("decks")
        const decks = loadedDecks ? JSON.parse(loadedDecks) : []

        deck = decks.find(it => it.id === deck.id)
        sentence = deck.sentences.find(it => it.id === sentence.id)
    })
</script>

<h1>Edit</h1>
{#if deck && sentence}
    <div class="sentence-container">
        <button class="primary" on:click={() => {dispatch("back")}}>Back</button>
        <table class="deck-table">
            <colgroup>
                <col class="raw"/>
                <col class="translation"/>
                <col class="note"/>
                <col class="hint"/>
                <col class="srs"/>
                <col class="actions"/>
            </colgroup>
            <thead>
            <tr>
                <th>Sentence</th>
                <th>Translation</th>
                <th>Notes</th>
                <th>Hint</th>
                <th>SRS Stage</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <KanjiInput value={sentence.raw} on:input={e => updateRaw(e.detail)}/>
                </td>
                <td>
                    <input bind:value={sentence.translation} on:input={e => updateTranslation(e.target.value)}/>
                </td>
                <td>
                    <input bind:value={sentence.note} on:input={e => updateNote(e.target.value)}/>
                </td>
                <td>
                    <input bind:value={sentence.hint} on:input={e => updateHint(e.target.value)}/>
                </td>
                <td>
                    <select bind:value={sentence.srs.stage} on:change={e => updateSrsStage(e.target.value)}>
                        {#each stages as stage}
                            <option value={stage}> {stage_name(stage)} </option>
                        {/each}
                    </select>
                </td>
                <td>
                   <button class="primary" on:click={() => updateSentence(sentence)}>Save</button>
                </td>
            </tr>
            </tbody>
        </table>
        <br>
        <div class="sentence-container">
        <ColoredReading readings={sentence.reading}
                        furigana={sentence.furigana}
                        colors={sentence.reading.map(it => "black")}
        />
        </div>
    </div>
{/if}

<style>
@import "../styles/table.css";
@import "../styles/button.css";
</style>