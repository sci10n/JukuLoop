<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import type {Deck, Sentence} from "../types/Sentence";
    import {parseJapaneseSentence, processComponents} from "../utils/conversionUtils";
    import {stages} from "../types/Srs";
    import {stage_name} from "../utils/srs";
    import KanjiInput from "../components/KanjiInput.svelte";
    import ColoredReading from "../components/ColoredReading.svelte";
    import {cleanupInput} from "../utils/misc";
    import {get_review_text} from "../types/Srs.js";
    import Navigation from "../components/Navigation.svelte";

    const dispatch = createEventDispatcher()

    export let deck: Deck
    export let sentence: Sentence


    const updateRaw = (raw: string) => {
        sentence.raw = raw.split("").map(it => cleanupInput(it)).join("")
        const components = parseJapaneseSentence(raw)
        const {reading, furigana, optional, optionalCluster} = processComponents(components);

        sentence.reading = reading
        sentence.furigana = furigana
        sentence.optional = optional
        sentence.optionalCluster = optionalCluster
    }

    const updateTranslation = (translation: string) => {
        sentence.translation = translation
    }

    const updateNote = (note: string) => {
        sentence.note = note
    }

    const updateHint = (hint: string) => {
        sentence.hint = hint
    }

    const updateSrsStage = (stage: number) => {
        if (!sentence.srs) {
            return
        }
        sentence.srs.stage = stages[stage]
    }

    const updateSentence = (sentence: Sentence) => {
        updateRaw(sentence.raw)
        const loadedDecks = localStorage.getItem("decks")
        const decks = loadedDecks ? JSON.parse(loadedDecks) : []

        const deckIndex = decks.findIndex(it => it.id === deck.id)
        const sentenceIndex = decks[deckIndex].sentences.findIndex(it => it.id === sentence.id)

        if (sentenceIndex === -1) {
            decks[deckIndex].sentences.push(sentence)
        } else {
            decks[deckIndex].sentences[sentenceIndex] = sentence
        }

        localStorage.setItem("decks", JSON.stringify(decks))
        dispatch("edit", {deck: deck, sentence: sentence})
    }

</script>

<h1>Edit</h1>
{#if deck && sentence}
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
                <th>Time until Review</th>
                <th>Reset SSR</th>
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
                    <p>{get_review_text(sentence.srs)}</p>
                </td>
                <td>
                    <button class="red" on:click={() => {
                        sentence.srs.streak = 0
                        sentence.srs.maxStreak = 0
                        sentence.srs.stage = stages[0]
                        sentence.srs.nextReview = new Date()
                    }
                         }>Reset
                    </button>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <ColoredReading readings={sentence.reading}
                                    furigana={sentence.furigana}
                                    colors={sentence.optional.map(it => it ? "blue" : "black")}
                    />
                </td>
            </tr>
            </tbody>
        </table>
    </div>
{/if}
<Navigation
        view={[{to: "cancel", label: "Cancel",  active: true}, {to: "save", label: "Save", active: true}]}
        on:navigate={(e) => {
              const to = e.detail.to
              if(to === "cancel") {
                  dispatch("cancel")
              } else if (to === "save") {
                  updateSentence(sentence)
              }
            }}/>
<style>
    @import "../styles/table.css";
    @import "../styles/button.css";
</style>