import {hasKanji} from "../utils/misc";

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

    const answerCorrectness = answer.split("")
        .map((it, index) => it === expectedAnswer.expectedAnswer[index])


    const result = expectedAnswer.expectedAnswer
        .map((expected, index) => expected === answer[index])

    const readingCorrectness = Array.from({length: sentence.reading.length}, () => true)
    expectedAnswer.readingMapping.map((readingIndex, index) => {
        if (!result[index]) {
            readingCorrectness[readingIndex] = false
        }
    })

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
