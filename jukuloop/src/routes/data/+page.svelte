<script lang="ts">
    import {writable} from 'svelte/store';
    import {convertToFuriganaFormat} from "../../utils/conversionUtils.ts";
    import {onMount} from "svelte";
    import * as wanakana from 'wanakana';

    let sentenceStore = writable([]);

    const convertToKana = (romaji: string) => wanakana.toKana(romaji, {IMEMode: true});
    const cleanupInput = (input) => input.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~\u3000-\u303f]/g, "")

    const addSentence = () => {
        sentenceStore.update(sentences => {
            const newSentence = {
                raw: "私（わたし）は学生（がくせい）です",
                reading: ["私", "は", "学生", "です"],
                furigana: ["わたし", "", "がくせい", ""],
                translation: "I am a student",
                note: "This is a note and will be shown with the answer.",
                hint: "This is a hint and will be shown with the question."
            }
            const updated = [...sentences, newSentence]
            localStorage.setItem('sentences', JSON.stringify(updated))
            return updated
        })
    }

    function updateSentence(raw, newRaw) {
        const processedReading = cleanupInput(newRaw)
        const parsedSentence = convertToFuriganaFormat(processedReading)

        sentenceStore.update(sentences => {
            const updated = sentences.map(sentence => {
                if (sentence.raw === raw) {
                    console.log(parsedSentence)
                    return {
                        ...sentence,
                        raw: processedReading,
                        reading: parsedSentence.reading,
                        furigana: parsedSentence.furigana,
                    }
                }
                return sentence
            })

            localStorage.setItem('sentences', JSON.stringify(updated))
            return updated
        })
    }

    const updateTranslation = (raw, translation) => {
        sentenceStore.update(sentences => {
            const updated = sentences.map(sentence => {
                if (sentence.raw === raw) {
                    return {
                        ...sentence,
                        translation: translation
                    }
                }
                return sentence
            })

            localStorage.setItem('sentences', JSON.stringify(updated))
            return updated
        })
    }

    const updateNote = (raw, note) => {
        sentenceStore.update(sentences => {
            const updated = sentences.map(sentence => {
                if (sentence.raw === raw) {
                    return {
                        ...sentence,
                        note: note
                    }
                }
                return sentence
            })

            localStorage.setItem('sentences', JSON.stringify(updated))
            return updated
        })
    }

    const updateHint = (raw, updateHint) => {
        sentenceStore.update(sentences => {
            const updated = sentences.map(sentence => {
                if (sentence.raw === raw) {
                    return {
                        ...sentence,
                        updateHint: updateHint
                    }
                }
                return sentence
            })

            localStorage.setItem('sentences', JSON.stringify(updated))
            return updated
        })
    }

    const handleInput = (event, raw) => {
        const selectionStart = event.target.selectionStart
        const selectionEnd = event.target.selectionEnd
        const convertedText = convertToKana(event.target.value)

        sentenceStore.update(sentences => {
            const updates = sentences.map(sentence => {
                if (sentence.raw === raw) {
                    return {
                        ...sentence,
                        raw: convertedText,
                    }
                }
                return sentence
            })

            localStorage.setItem('sentences', JSON.stringify(updates))
            return updates
        })

        event.target.focus()
        requestAnimationFrame(() => {
            event.target.setSelectionRange(selectionStart, selectionEnd);
        })
    }

    onMount(() => {
        const storedSentences = localStorage.getItem('sentences');
        if (storedSentences) {
            sentenceStore.set(JSON.parse(storedSentences));
        }
    })

</script>

<style>
    :global(body) {
        background: #22221f;
        color: white;
    }

    table {
        width: 100%;
        background: #2c2b29;
        box-shadow: .3rem .3rem .36rem #1c1c1c;
        border-radius: 1em;
        margin-top: 1%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    td {
        padding: 0.5em;
    }

    input[type="text"] {
        padding-left: 1em;
        width: 100%;
        box-sizing: border-box;
        font-size: 1em;

        border-style: solid;
        border-radius: 5em;
        background: #e8e8e8;

        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    button {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    ruby {
        font-size: 1.3em;
    }

    .reading {
        text-align: center;
        color: #94f77e;
        font-size: 1.2em;
    }

    .centered {
        text-align: center;
    }

</style>

<h2>Stored Sentences</h2>
<table>
<tr>
    <td class="centered">
        <h3>Formatted Sentence</h3>
    </td>
    <td>
        <h3>Raw Sentence (with Furigana)</h3>
    </td>
    <td>
        <h3>English Translation</h3>
    </td>
    <td>
        <h3>Additional Notes</h3>
    </td>
    <td>
        <h3>Hint for Sentence</h3>
    </td>
    <td>
        <h3>SRS Stage</h3>
    </td>
    <td>
        <h3>Actions</h3>
    </td>
</tr>
    {#each $sentenceStore as sentence}
        <tr>
            <td class="reading">
                {#each sentence.reading as reading, index}
                    {#if sentence.furigana[index]}
                        <ruby>{reading}
                            <rt>{sentence.furigana[index]}</rt>
                        </ruby>
                    {:else}
                        {reading}
                    {/if}
                {/each}
            </td>
            <td>
                <input type="text" bind:value={sentence.raw}
                       on:input={(event) => handleInput(event, sentence.raw)}
                       on:blur={(event) => updateSentence(sentence.raw, event.target.value)}
                />
            </td>
            <td>
                <input type="text" bind:value={sentence.translation}
                       on:blur={(event) => updateTranslation(sentence.raw, event.target.value)}
                />
            </td>
            <td>
                <input type="text" bind:value={sentence.note}
                       on:blur={(event) => updateNote(sentence.raw, event.target.value)}
                />
            </td>
            <td>
                <input type="text" bind:value={sentence.hint}
                       on:blur={(event) => updateHint(sentence.raw, event.target.value)}
                />
            </td>
            <td>
                <input type="text" bind:value={sentence?.srs.stage} disabled="disabled" />
            </td>
            <td>
                <button on:click={() => {
                    sentenceStore.update(sentences => sentences.filter(s => s.raw !== sentence.raw))
                    localStorage.setItem('sentences', JSON.stringify($sentenceStore))
                }}>Delete
                </button>
            </td>
        </tr>
    {/each}
    <tr>
        <td>
            <button on:click={addSentence}>Add</button>
        </td>
    </tr>
</table>