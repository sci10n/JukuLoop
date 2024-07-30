<script lang="ts">
    import * as wanakana from "wanakana";

    import ColoredReading from "../components/ColoredReading.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import SrsPopup from "../components/SrsPopup.svelte";
    import {adjust_srs, pick_sentences, type Stage} from "../types/Srs";
    import {
        type AnswerCorrectness,
        calculateCorrectnessForwardAndBackward,
        type Deck,
        type Sentence
    } from "../types/Sentence";
    import {cleanupInput} from "../utils/misc";

    export let selectedDeck: Deck | null = null

    const dispatch = createEventDispatcher()

    let kanjiInputField: HTMLInputElement
    let currentAnswer = ""
    let answerLockedIn = false

    let invalidInput = false
    let notification = ""

    let showPopup = false;
    let newSrsLevel: Stage;
    let lastSrsLevel: Stage;

    let hasAdjustedSrs = false

    $: selectedSentences = selectedDeck ? pick_sentences(selectedDeck) as Sentence[] : []
    $: if (selectedDeck) {
        pickSentence()
    }

    const pickSentence = () => {
        if (selectedSentences.length > 0) {
            selectedSentences = selectedDeck ? pick_sentences(selectedDeck) as Sentence[] : []
            console.log("Number of sentences: " + selectedSentences.length)
            if (selectedSentences.length === 0) {
                currentSentence = null
                return
            }
            currentSentence = selectedSentences[Math.floor(Math.random() * selectedSentences.length)]
        }

        focusInput()
    }

    const resetAnswer = () => {
        currentAnswer = ""
        if (kanjiInputField) kanjiInputField.value = ""
        answerLockedIn = false
    }

    const lockInAnswer = () => {
        answerLockedIn = true

        const srs = currentSentence?.srs
        if (srs && !hasAdjustedSrs) {
            const new_srs = adjust_srs(srs, answerCorrect)
            newSrsLevel = new_srs.stage
            lastSrsLevel = srs.stage
            showPopup = true
            dispatch('srs', {
                sentence: currentSentence,
                srs: new_srs
            })
        }
    }

    const focusInput = () => {
        kanjiInputField && kanjiInputField.focus()
    }

    const validateInput = (input: string) => {
        if (input === "") {
            invalidInput = true
            notification = "Input cannot be empty!"
            return
        }

        const invalidChars = /[a-zA-Z0-9]/;
        invalidInput = invalidChars.test(input)
        notification = invalidInput ? "Invalid characters in input!" : ""
    }

    let currentSentence: Sentence | null = null

    $: if (currentSentence) {
        hasAdjustedSrs = false
    }

    $: answerCorrectness = currentSentence && calculateCorrectnessForwardAndBackward(currentSentence, currentAnswer) as AnswerCorrectness
    $: answerColors = answerCorrectness && answerCorrectness.answerCorrectness.map((correct) => correct ? '#94f77e' : '#f25f44')
    $: readingColors = answerCorrectness && answerCorrectness.readingCorrectness.map((correct) => correct ? '#94f77e' : '#f25f44')
    $: answerCorrect = answerCorrectness ? answerCorrectness.isCorrect : false

    $: if (kanjiInputField) {
        kanjiInputField.value = ""
        kanjiInputField && wanakana.bind(kanjiInputField)
        kanjiInputField.addEventListener('input', (event) => {
            currentAnswer = cleanupInput((event.target as HTMLInputElement).value)
        })
        focusInput()
    }


    onMount(() => {
        pickSentence()
        window.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                validateInput(currentAnswer)
                if (invalidInput) {
                    return
                }
                if (selectedDeck && currentSentence && answerLockedIn) {
                    resetAnswer()
                    pickSentence()
                } else {
                    lockInAnswer()
                }
            }
        })
    })

</script>

{#if currentSentence === null}
    <h1>No sentences to review</h1>
    <p class="centered">Try adding some sentences to the deck or select a different deck</p>
{/if}

{#if currentSentence}
    <h1>{currentSentence.translation}</h1>

    <div class="hint-container">
        <p>{currentSentence.hint}</p>
    </div>

    {#if showPopup}
        <SrsPopup stage={newSrsLevel} animateUp={newSrsLevel > lastSrsLevel} on:hide={() => showPopup = false}/>
    {/if}
    <div class="input-container">
        <input type="text" bind:this={kanjiInputField}/>
    </div>

    {#if notification}
        <div class="notification">{notification}</div>
    {/if}

    {#if answerLockedIn}
        <div class="sentence-container">
            <ColoredReading
                    readings={currentAnswer}
                    furigana={[]}
                    colors={answerColors}
            />
        </div>
        <div class="sentence-container">
            <ColoredReading
                    readings={currentSentence.reading}
                    furigana={currentSentence.furigana}
                    colors={readingColors}
            />
        </div>
        {#if currentSentence.note}
            <div class="note-container">
                <p>{currentSentence.note}</p>
            </div>
        {/if}
        <div class="result-container">
            <h2 class={answerCorrect ? 'correct' : 'incorrect'}>
                {answerCorrect ? 'Correct!' : 'Incorrect'}
            </h2>
        </div>
    {/if}

{/if}

<style>
    .centered {
        text-align: center;
    }

    h1 {
        color: white;
        text-align: center;
        padding-top: 1em;
    }

    input {
        width: 60%;
        border-style: solid;
        border-radius: 5em;
        border-color: var(--border-color, black);
        background: var(--background-color, white);
        color: var(--font-color, #000000);
        font-size: 1.5em;
        margin-bottom: 1em;
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

    .hint-container {
        text-align: center;
        margin-top: 0.5em;
        color: white;
    }

    .note-container {
        text-align: center;
        margin-top: 0.3em;
        color: white;
    }

    @media (max-width: 480px) {
        .sentence-container {
            margin-left: 5%;
            margin-right: 5%;
        }

    .input-container input {
        width: 90%;
    }

    }

    .notification {
        color: #f25f44;
        text-align: center;
        margin-top: 0.5em;
    }

    .correct {
        color: #94f77e;
    }

    .incorrect {
        color: #f25f44;
    }
</style>