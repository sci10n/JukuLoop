import type {SRS} from "./Srs";
import {Stage} from "./Srs";
import {hasKanji} from "../utils/misc";

export interface Sentence {
    id: string
    raw: string
    reading: string[]
    furigana: string[]
    translation: string
    note?: string
    hint?: string
    srs?: SRS
}

export interface Deck {
    id: string,
    sentences: Sentence[]
    name: string
    description: string
}


export const placeholderSentence: Sentence = {
    id: "placeholder-card",
    raw: "私（わたし）は学生（がくせい）です",
    reading: ["私", "は", "学生", "で", "す"],
    furigana: ["わたし", "", "がくせい", "", ""],
    translation: "I am a student",
    note: "This is a note and will be shown with the answer.",
    hint: "This is a hint and will be shown with the question.",
    srs: {
        stage: Stage.Apprentice1,
        nextReview: new Date(),
        lastReview: new Date(),
        streak: 0,
        maxStreak: 0
    }
}

export const placeholderDeck: Deck = {
    id: "placeholder-deck",
    sentences: [placeholderSentence],
    name: "Placeholder deck",
    description: "This is a placeholder deck"
}


export interface Card {
    id: string
    raw: string
    reading: string[]
    furigana: string[]
    translation: string
    note: string
    hint: string
    srs: SRS
}


export const calculateCorrectnessForwardAndBackward = (sentence: ReadingAndFurigana, answer: string): AnswerCorrectness => {

    const forward = calculateCorrectness(sentence, answer)

    const reverseReading = sentence.reading.toReversed().map(it => it.split("").toReversed().join(""))
    const reverseFurigana = sentence.furigana.toReversed().map(it => it.split("").toReversed().join(""))
    const reverseAnswer = answer.split("").toReversed().join("")

    const backward_reverse = calculateCorrectness({
        reading: reverseReading,
        furigana: reverseFurigana
    }, reverseAnswer)

    const backward = {
        readingCorrectness: backward_reverse.readingCorrectness.toReversed(),
        answerCorrectness: backward_reverse.answerCorrectness.toReversed(),
        isCorrect: backward_reverse.isCorrect
    }
    return {
        readingCorrectness: forward.readingCorrectness,
        answerCorrectness: forward.answerCorrectness,
        isCorrect: forward.isCorrect && backward.isCorrect
    }
}


export const calculateCorrectness = (sentence: ReadingAndFurigana, answer: string): AnswerCorrectness => {
    const useKanji = hasKanji(answer)

    if (answer === "") {
        return {
            readingCorrectness: Array.from({length: sentence.reading.length}, () => false),
            answerCorrectness: Array.from({length: answer.length}, () => false),
            isCorrect: false
        }
    }

    const expectedAnswer = getExpectedAnswer(useKanji, sentence)

    const answerCorrectnessForward = answer.split("")
        .map((it, index) => it === expectedAnswer.expectedAnswer[index])

    const answerCorrectness = answerCorrectnessForward

    const result = expectedAnswer.expectedAnswer
        .map((expected, index) => expected === answer[index])

    const readingCorrectnessForward = Array.from({length: sentence.reading.length}, () => true)
    expectedAnswer.readingMapping.map((readingIndex, index) => {
        if (!result[index]) {
            readingCorrectnessForward[readingIndex] = false
        }
    })

    const readingCorrectness = readingCorrectnessForward

    const answersCorrect = answerCorrectness.every((correct) => correct)
    const readingsCorrect = readingCorrectness.every((correct) => correct)
    const lengthCorrect = answer.length === expectedAnswer.expectedAnswer.length
    return {
        readingCorrectness: readingCorrectness,
        answerCorrectness: answerCorrectness,
        isCorrect: answersCorrect && readingsCorrect && lengthCorrect
    }
}

const getExpectedAnswer = (useKanji: boolean, sentence: ReadingAndFurigana): ExpectedAnswer => {
    const result = []
    const readingMapping = []
    for (let i = 0; i < sentence.reading.length; i++) {
        const furigana = sentence.furigana[i]
        const reading = sentence.reading[i]

        if (useKanji) {
            reading.split("")
                .forEach((readingPart, index) => {
                    result.push(readingPart)
                    readingMapping.push(i)
                })
        } else {
            const reading2 = furigana === "" ? reading : furigana
            reading2.split("").forEach((readingPart, index) => {
                result.push(readingPart)
                readingMapping.push(i)
            })
        }
    }
    return {expectedAnswer: result, readingMapping: readingMapping}
}

export interface ExpectedAnswer {
    expectedAnswer: string[]
    readingMapping: number[]
}

export interface AnswerCorrectness {
    readingCorrectness: boolean[]
    answerCorrectness: boolean[]
    isCorrect: boolean
}

interface ReadingAndFurigana {
    reading: string[]
    furigana: string[]
}
