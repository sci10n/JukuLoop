<script lang="ts">

    import {type Deck, placeholderSentence, type Sentence} from "../types/Sentence";
    import ColoredReading from "./ColoredReading.svelte";
    import {cleanupInput, convertToKana} from "../utils/misc";
    import {convertToFuriganaFormat} from "../utils/conversionUtils";
    import {createEventDispatcher} from "svelte";
    import SrsStage from "./SrsStage.svelte";
    import KanjiInput from "./KanjiInput.svelte";

    export let editable: boolean = false
    export let deck: Deck

    const dispatch = createEventDispatcher()
    const updateDeck = (deck: Deck) => dispatch("message", {
        deck: deck
    })

    const deleteDeck = () => {
        dispatch("delete")
    }

    const updateName = (name: string) => {
        deck.name = name
    }

    const updateDescription = (description: string) => {
        deck.description = description
    }

    const updateRaw = (raw: string, index: number) => {
        const cleanedRaw = cleanupInput(convertToKana(raw))
        deck.sentences[index].raw = cleanedRaw
        deck.sentences[index] = updateSentence(cleanedRaw, deck.sentences[index])
    }

    const updateTranslation = (translation: string, index: number) => {
        deck.sentences[index].translation = translation
    }

    const updateNote = (note: string, index: number) => {
        deck.sentences[index].note = note
    }

    const updateHint = (hint: string, index: number) => {
        deck.sentences[index].hint = hint
    }

    const addSentence = () => {
        const newDeck = {
            ...deck,
            sentences: [
                ...deck.sentences,
                placeholderSentence
            ]
        }
        updateDeck(newDeck)
    }

    const deleteSentence = (index: number) => {
        const newDeck = {
            ...deck,
            sentences: deck.sentences.filter((_, i) => i !== index)
        }
        updateDeck(newDeck)
    }

    const updateSentence = (raw: string, sentence: Sentence): Sentence => {
        const converted = convertToFuriganaFormat(raw)
        return {
            ...sentence,
            reading: converted.reading,
            furigana: converted.furigana
        }
    }

</script>

<style>
    .container {
        width: 100%;
        background: #2c2b29;
        box-shadow: .3rem .3rem .36rem #1c1c1c;
        border-radius: 1em;
        margin-left: auto;
        margin-top: 1em;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }
    .deck-table {
        width: 100%;
        margin-left: auto;
        margin-top: 1em;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    .deck-table th, .deck-table td {
        border: 1px solid var(--border-color, #ddd);
        padding: 8px;
        height: 10px; /* Set a fixed height */

    }

    .deck-table th {
        background-color: var(--background-color, #ddd);
        text-align: left;
    }

    .reading {
        font-size: 1em;
        overflow-x: scroll;
        width: 15%;
    }

    .srs-container {
        width: 15%;
    }

    input {
        border-style: solid;
        border-color: var(--border-color, #ddd);
        background: var(--deck-color, #ddd);
        color: white;
    }

    textarea {
        border-style: solid;
        border-color: var(--border-color, #ddd);
        background: var(--deck-color, #ddd);
        color: white;

        overflow: clip;
        resize: none;
        height: 50px;
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        .deck-table, .deck-table thead, .deck-table tbody, .deck-table th, .deck-table td, .deck-table tr {
            display: block;
        }

        .deck-table tr {
            margin-bottom: 15px;
        }

        .deck-table td {
            text-align: right;
            padding-left: 50%;
            position: relative;
        }

        .deck-table td::before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 10px;
            font-weight: bold;
            text-align: left;
        }

        .deck-table th {
            display: none;
        }
    }
</style>

<div class="container">
    <input bind:value={deck.name} disabled={!editable} class="title"/>
    <input bind:value={deck.description} disabled={!editable} class="description"/>

    <button on:click={deleteDeck} disabled={!editable} >Delete Deck </button>

    <table class="deck-table">
        <colgroup>
            <col class="reading"/>
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
            <th>Raw</th>
            <th>Translation</th>
            <th>Notes</th>
            <th>Hint</th>
            <th>SRS Stage</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each deck.sentences as sentence, i}
            <tr>
                <td class="reading" data-label="Sentence">
                    <ColoredReading readings={sentence.reading} furigana={sentence.furigana}
                                    colors={sentence.reading.map(it => "#94f77e")}/>
                </td>
                <td data-label="Raw">
                    <KanjiInput value={sentence.raw} on:input={it => updateRaw(it.detail, i)}
                        --background-color="var(--deck-color)"
                                --font-color="white"
                                --border-color="var(--deck-color)"

                    />

                </td>
                <td data-label="Translation">
                    <textarea
                           bind:value={sentence.translation}
                           on:input={(event) => updateTranslation(event.target.value, i)}
                           disabled={!editable}
                    />
                </td>
                <td data-label="Notes">
                    <textarea
                           bind:value={sentence.note}
                           on:input={(event) => updateNote(event.target.value, i)}
                           disabled={!editable}
                    />
                </td>
                <td data-label="Hint">
                    <textarea
                           bind:value={sentence.hint}
                           on:input={(event) => updateHint(event.target.value, i)}
                           disabled={!editable}
                    />
                </td>
                <td data-label="SRS Stage" class="srs-container">
                   <SrsStage stage={sentence.srs.stage} srs={sentence.srs}/>
                </td>
                <td data-label="Actions">
                    <button class="align-button" on:click={() => deleteSentence(i) }>Delete</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    <button on:click={addSentence} disabled={!editable}>Add Sentence</button>

</div>