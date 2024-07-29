<script lang="ts">

    import {type Deck, placeholderSentence, type Sentence} from "../types/Sentence";
    import ColoredReading from "./ColoredReading.svelte";
    import {cleanupInput, convertToKana} from "../utils/misc";
    import {convertToFuriganaFormat} from "../utils/conversionUtils";
    import {createEventDispatcher} from "svelte";
    import SrsStage from "./SrsStage.svelte";
    import KanjiInput from "./KanjiInput.svelte";
    import {stages} from "../types/Srs";
    import {stage_name} from "../utils/srs";

    export let editable: boolean = false
    export let deck: Deck

    const dispatch = createEventDispatcher()
    const updateDeck = (deck: Deck) => dispatch("message", {
        deck: deck
    })

    const deleteDeck = () => {
        dispatch("delete")
    }

    let sentenceEditing = false
    let sentenceIndex = -1

    const editSentence = (index: number) => {
        sentenceEditing = true
        sentenceIndex = index
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
        background: white;
        width: 100%;
        border-radius: 1em;
        margin-left: auto;
        margin-top: 1em;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
        text-align: left;
    }

    button {
        background-color: #cdcdcd;
        color: black;
        border: none;
        border-radius: 0;
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #f3f3f3;
    }

    button:disabled {
        background-color: #888;
        cursor: not-allowed;
    }
</style>

<div class="container">
    {#if sentenceEditing}
        <div class="sentence-container">
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
                        <KanjiInput value={deck.sentences[sentenceIndex].raw}
                                    on:input={e => updateRaw(e.detail, sentenceIndex) }/>
                    </td>
                    <td>
                        <input bind:value={deck.sentences[sentenceIndex].translation}
                               on:input={e => updateTranslation(e.target.value, sentenceIndex)}/>
                    </td>
                    <td>
                        <input bind:value={deck.sentences[sentenceIndex].note}
                               on:input={e => updateNote(e.target.value, sentenceIndex)}/>
                    </td>
                    <td>
                        <input bind:value={deck.sentences[sentenceIndex].hint}
                               on:input={e => updateHint(e.target.value, sentenceIndex)}/>
                    </td>
                    <td>
                        <select bind:value={deck.sentences[sentenceIndex].srs.stage}>
                            {#each stages as stage}
                                <option value={stage}> {stage_name(stage)} </option>
                            {/each}
                        </select>
                    </td>
                    <td>
                        <button on:click={() => {deleteSentence(sentenceIndex); sentenceEditing = false}}>Delete
                            Sentence
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <br>
            <ColoredReading readings={deck.sentences[sentenceIndex].reading}
                            furigana={deck.sentences[sentenceIndex].furigana}
                            colors={deck.sentences[sentenceIndex].reading.map(it => "black")}/>

        </div>
    {/if}
    {#if !sentenceEditing}
        <input bind:value={deck.name} disabled={!editable} class="title"/>
        <input bind:value={deck.description} disabled={!editable} class="description"/>

        <button on:click={addSentence} disabled={!editable}>Add Sentence</button>
        <table class="deck-table">
            <colgroup>
                <col class="reading"/>
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
            {#each deck.sentences as sentence, i}
                <tr>
                    <td class="reading" data-label="Sentence">
                        <ColoredReading readings={sentence.reading} furigana={sentence.furigana}
                                        colors={sentence.reading.map(it => "black")}/>
                    </td>
                    <td data-label="Translation">
                        <p>{sentence.translation}</p>
                    </td>
                    <td data-label="Notes">
                        <p>{sentence.note}</p>
                    </td>
                    <td data-label="Hint">
                        <p>{sentence.hint}</p>
                    </td>
                    <td data-label="SRS Stage" class="srs-container">
                        <SrsStage stage={sentence.srs.stage} srs={sentence.srs}/>
                    </td>
                    <td data-label="Actions">
                        <button class="align-button" on:click={() => {editSentence(i)}}>Edit</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
        <button on:click={deleteDeck} disabled={!editable}>Delete Deck</button>
    {/if}
</div>