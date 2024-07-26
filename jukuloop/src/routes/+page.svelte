<script lang="ts">
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import * as wanakana from "wanakana";
    import type {Sentence} from "../types/Sentence";
    import ColoredReading from "../components/ColoredReading.svelte";


    const convertToKana = (romaji: string) => wanakana.toKana(romaji, {IMEMode: true});
    const cleanupInput = (input) => input.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~\u3000-\u303f]/g, "")
    const containsRoman = (input) => input.match(/[a-zA-Z]/)

    const splitSentence = (sentence: Sentence): Sentence => {
        const result = sentence.reading.map((reading, index) => {
            if (wanakana.isKana(reading)) {
                const newParts = reading.split("")
                return newParts.map((part) => {
                    return {reading: part, furigana: ""}
                })
            }
            return [{reading: reading, furigana: sentence.furigana[index]}]
        })


        return {
            raw: sentence.raw,
            reading: result.flat().map((part) => part.reading),
            furigana: result.flat().map((part) => part.furigana),
            translation: sentence.translation,
            note: sentence.note,
            hint: sentence.hint
        }
    }

    const sentenceStore = writable<Array<Sentence>>([])

    export interface AnswerResult2 {
        expectedReading: string
        readingCorrectness: boolean[]
        correspondingSentenceParts: number[]
        sentencePartsCorrectness: boolean[]
    }


    let sentence: Sentence | null = null
    let currentAnswer = ""
    let answerResult: AnswerResult2 | null = null
    let answerLockedIn = false
    let answerCorrect = false

    let answerInputRef

    let currentSentence = 0

    interface ReadingMapping {
        unrolled: string
        correspondingSentenceParts: number[]
    }

    const mapReadingToFurigana = (sentence: Sentence): ReadingMapping => {
        let mappedReading = ""
        let correspondingSentenceParts = []
        for (let i = 0; i < sentence.reading.length; i++) {
            let partLength = sentence.reading[i].length
            if (sentence.furigana[i] !== "") {
                mappedReading += sentence.furigana[i]
                partLength = sentence.furigana[i].length
            } else {
                mappedReading += sentence.reading[i]
                partLength = sentence.reading[i].length
            }
            for (let j = 0; j < partLength; j++) {
                correspondingSentenceParts.push(i)
            }
        }
        return {
            unrolled: mappedReading,
            correspondingSentenceParts
        }
    }

    const mapReadingToKanji = (sentence: Sentence): ReadingMapping => {
        let mappedReading = ""
        let correspondingSentenceParts = []
        for (let i = 0; i < sentence.reading.length; i++) {
            let partLength = sentence.reading[i].length
            mappedReading += sentence.reading[i]

            for (let j = 0; j < partLength; j++) {
                correspondingSentenceParts.push(i)
            }
        }
        return {
            unrolled: mappedReading,
            correspondingSentenceParts
        }
    }

    const containsKanji = (input) => input.match(/[\u4E00-\u9FAF]/)

    const updatePartialAnswer = () => {
        currentAnswer = convertToKana(cleanupInput(currentAnswer))
        if (sentence !== null) {
            const correctAnswer = containsKanji(currentAnswer) ? mapReadingToKanji(sentence) : mapReadingToFurigana(sentence)
            const answerResultBuild: AnswerResult2 = {
                expectedReading: correctAnswer.unrolled,
                readingCorrectness: [],
                correspondingSentenceParts: correctAnswer.correspondingSentenceParts,
                sentencePartsCorrectness: sentence.reading.map(() => false)
            }

            for (let i = 0; i < currentAnswer.length; i++) {
                answerResultBuild.readingCorrectness.push(currentAnswer[i] === correctAnswer.unrolled[i])

                const sentencePart = correctAnswer.correspondingSentenceParts[i]
                const sentenceParMask = correctAnswer.correspondingSentenceParts
                    .map((part) => part === sentencePart ? 1 : 0)

                for (let j = 0; j < sentenceParMask.length; j++) {
                    const isCorrect = sentenceParMask.map((mask, index) => mask == 0 || currentAnswer[index] === correctAnswer.unrolled[index])
                    answerResultBuild.sentencePartsCorrectness[sentencePart] = isCorrect.every((correct) => correct)
                }
            }

            if (currentAnswer.length > correctAnswer.unrolled.length) {
                answerResultBuild.expectedReading += currentAnswer.slice(correctAnswer.unrolled.length)
                answerResultBuild.readingCorrectness = answerResultBuild.readingCorrectness.concat(new Array(currentAnswer.length - correctAnswer.unrolled.length).fill(false))
            }

            answerResult = answerResultBuild
        }
    }

    const lockInAnswer = () => {
        if (answerResult !== null) {
            answerCorrect = answerResult.sentencePartsCorrectness.every((correct) => correct)
                && answerResult.readingCorrectness.every((correct) => correct)
            answerLockedIn = true
        }
    }

    const resetAnswer = () => {
        answerResult = null
        answerLockedIn = false
        answerCorrect = false
        currentAnswer = ""
    }

    const pickNextSentence = () => {
        currentSentence = (currentSentence + 1) % $sentenceStore.length
        sentence = splitSentence($sentenceStore[currentSentence])
        resetAnswer()
        answerInputRef.focus()
    }

    onMount(() => {
        const storedSentences = localStorage.getItem('sentences')
        if (storedSentences) {
            sentenceStore.set(JSON.parse(storedSentences))
        }
        else {
            sentenceStore.set([
                {
                    raw: "私（わたし）は学生（がくせい）です",
                    reading: ["私", "は", "学生", "です"],
                    furigana: ["わたし", "", "がくせい", ""],
                    translation: "I am a student",
                    note: "This is a note",
                    hint: "This is a hint"
                }
            ])
        }

        sentenceStore.subscribe(value => {
            if (value.length > 0) {
                sentence = splitSentence(value[currentSentence])
            }
        })

        window.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                if (answerLockedIn) {
                    pickNextSentence()
                } else {
                    lockInAnswer()
                }
            }
        })

        answerInputRef.focus()
    })

</script>

<style>
    :global(body) {
        background: #22221f;
        color: white;
    }

    h1 {
        color: white;
        text-align: center;
        padding-top: 1em;
    }

    .container {
        width: 600px;
        background: #2c2b29;
        box-shadow: .3rem .3rem .36rem #1c1c1c;
        border-radius: 1em;
        margin-top: 10%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    .input-container {
        text-align: center;
    }

    .input-container input {
        width: 60%;
        border-style: solid;
        border-radius: 5em;
        background: #e8e8e8;
        font-size: 1.5em;
        margin-bottom: 1em;
    }

    .sentence-container {
        margin-left: 20%;
        margin-right: 20%;
    }

    .result-container {
        text-align: center;
    }

    .note-container {
        text-align: center;
        margin-top: 0.3em;
    }

    .hint-container {
        text-align: center;
        margin-bottom: 1em;
    }

    .correct {
        color: #94f77e;
    }

    .incorrect {
        color: #f25f44;
    }

</style>
<div class="page">
    <div class="container">
        {#if sentence !== null}
            <h1>{sentence.translation}</h1>
            {#if sentence.hint}
                <div class="hint-container">
                    <p>{sentence.hint}</p>
                </div>
            {/if}
        {/if}
        {#if sentence === null}
            <h1> Loading... </h1>
        {/if}
        <div class="content">
            <div class="input-container">
                <input type="text"
                       bind:value={currentAnswer}
                       bind:this={answerInputRef}
                       on:input={updatePartialAnswer}
                >
            </div>
            {#if answerResult !== null && answerLockedIn}
                <div class="sentence-container">
                    <ColoredReading
                            readings={answerResult.expectedReading}
                            furigana={[]}
                            colors={answerResult.readingCorrectness.map((correct) => correct ? '#94f77e' : '#f25f44')}
                    />
                    <ColoredReading
                            readings={sentence.reading}
                            furigana={sentence.furigana}
                            colors={answerResult.sentencePartsCorrectness.map((correct) => correct ? '#94f77e' : '#f25f44')}
                    />
                </div>
                {#if sentence.note}
                    <div class="note-container">
                        <p>{sentence.note}</p>
                    </div>
                {/if}
                <div class="result-container">
                    {#if answerCorrect}
                        <h2 class="correct">Correct!</h2>
                    {:else}
                        <h2 class="incorrect">Incorrect</h2>
                    {/if}
                </div>
            {/if}
        </div>

    </div>
</div>