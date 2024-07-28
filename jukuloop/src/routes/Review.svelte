<script lang="ts">
    import * as wanakana from "wanakana";

    import type {Deck, Sentence} from "../types/Sentence";
    import ColoredReading from "../components/ColoredReading.svelte";
    import {type AnswerCorrectness, calculateCorrectness} from "./state";
    import {adjust_srs, pick_sentences} from "../types/Srs";
    import {createEventDispatcher, onMount} from "svelte";

    export let selectedDeck: Deck | null = null

    const dispatch = createEventDispatcher()

    let kanjiInputField: HTMLInputElement
    let currentAnswer = ""
    let answerLockedIn = false

    let invalidInput = false
    let notification = ""


    $: selectedSentences = selectedDeck ? pick_sentences(selectedDeck) as Sentence[] : []

    const pickSentence = () => {
        if (selectedSentences.length > 0) {
            currentSentence = selectedSentences[Math.floor(Math.random() * selectedSentences.length)]
        }

        focusInput()
    }

    const resetAnswer = () => {
        currentAnswer = ""
        kanjiInputField.value = ""
        answerLockedIn = false
    }

    const lockInAnswer = () => {
        answerLockedIn = true

        const srs = currentSentence?.srs
        if(srs) {
            const new_srs = adjust_srs(srs, answerCorrect)
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
        const invalidChars = /[a-zA-Z0-9]/;
        invalidInput = invalidChars.test(input)
        console.log("invalidInput", invalidInput)
        console.log("input", input)
        notification = invalidInput ? "Invalid characters in input!" : ""
    }

    let currentSentence: Sentence | null = null

    $: answerCorrectness = currentSentence && calculateCorrectness(currentSentence, currentAnswer) as AnswerCorrectness
    $: answerColors = answerCorrectness && answerCorrectness.answerCorrectness.map((correct) => correct ? '#94f77e' : '#f25f44')
    $: readingColors = answerCorrectness && answerCorrectness.readingCorrectness.map((correct) => correct ? '#94f77e' : '#f25f44')
    $: answerCorrect = answerCorrectness ? answerCorrectness.isCorrect : false

    $: if (kanjiInputField) {
        kanjiInputField.value = ""
        kanjiInputField && wanakana.bind(kanjiInputField)
        kanjiInputField.addEventListener('input', (event) => {
            currentAnswer = (event.target as HTMLInputElement).value
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

{#if currentSentence}
    <h1>{currentSentence.translation}</h1>

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
        color: var(--font-color, black);
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

    .note-container {
        text-align: center;
        margin-top: 0.3em;
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