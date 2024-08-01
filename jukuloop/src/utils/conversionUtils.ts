import {hasKanji} from "./misc";
import type {Sentence} from "../types/Sentence";


// Example usage
// const input = "東京(とうきょう)は日本(にほん)の首都(しゅと)です。";
// const input2 = "私（わたし）は日本語（にほんご）を話（はな）します";私
// const input3 = "毎朝(まいあさ)((天気(てんき)が良(よ)ければ))散歩(さんぽ)をしますテニス(てにす)をします";
// console.log(convertToFuriganaFormat(input));
// console.log(convertToFuriganaFormat(input2));
// console.log(convertToFuriganaFormat(input3));
interface Component {
    type: 'kanji' | 'katakana' | 'plain' | 'optional' | 'punctuation' | "ignore";
    text: string;
    reading?: string;
}


export function parseJapaneseSentence(inputString: string): Component[] {
    const regex = /([\u3400-\u9FAF々]+)[(（](.+?)[)）]|\(\((.+?)\)\)|([ァ-ヶー]+)[(（](.+?)[)）]|([^\u3400-\u9FAFァ-ヶー\s\p{P}]+)|([\s\p{P}])/gu;
    const components: Component[] = [];

    let match;
    while ((match = regex.exec(inputString)) !== null) {
        if (match[1] && match[2]) { // Kanji with furigana
            components.push({type: 'kanji', text: match[1], reading: match[2]});
        } else if (match[3]) { // Optional part
            components.push({type: 'optional', text: match[3]});
        } else if (match[4] && match[5]) { // Katakana with hiragana reading
            components.push({type: 'katakana', text: match[4], reading: match[5]});
        } else if (match[6]) { // Plain text
            const hiragana = splitHirganana(match[6]);
            hiragana.forEach((part) => {
                components.push({type: 'plain', text: part});
            });
        } else if (match[7]) { // Punctuation or space
            components.push({type: 'punctuation', text: match[7]});
        }
    }
    console.log(components)
    return components;
}

export function processComponents(components: Component[], includePunctuation: boolean = true): {
    reading: string[],
    furigana: string[],
    optional: boolean[],
    optionalCluster: number[]
} {
    const reading: string[] = [];
    const furigana: string[] = [];
    const optional: boolean[] = [];
    const optionalCluster: number[] = [];
    let clusterCounter = 0;
    components.forEach((component, index) => {
        switch (component.type) {
            case 'kanji':
            case 'katakana':
                reading.push(component.text);
                furigana.push(component.reading!);
                optional.push(false);
                optionalCluster.push(-1);
                break;
            case 'plain':
                const hiragana = splitHirganana(component.text)
                hiragana.forEach((part) => {
                    reading.push(part);
                    furigana.push('');
                    optional.push(false);
                    optionalCluster.push(-1);
                })
                break;
            case 'optional':
                let adjustedText = component.text
                // This is to handle the case where the optional part is followed by a punctuation due to the regex not being able to handle it.
                if (components[index + 1].type === 'punctuation' && components[index + 1].text === ')') {
                    adjustedText = component.text + ")"
                    components[index + 1].type = "ignore"
                }
                const subComponents = parseJapaneseSentence(adjustedText);
                const subProcessed = processComponents(subComponents);
                reading.push(...subProcessed.reading);
                furigana.push(...subProcessed.furigana);
                optional.push(...subProcessed.optional.map(() => true));
                optionalCluster.push(...subProcessed.optional.map(() => clusterCounter));
                clusterCounter = clusterCounter + 1;
                break;
            case 'punctuation':
                if (includePunctuation) {
                    reading.push(component.text);
                    furigana.push('');
                    optional.push(true);
                    optionalCluster.push(clusterCounter);
                    clusterCounter = clusterCounter + 1;

                }
                break;
        }
    });

    return {reading, furigana, optional, optionalCluster};
}

const splitHirganana = (input: string): string[] => {
    return input.split("").map((part) => part)
}


// Usage

const sentences = [
    "彼女(かのじょ)は((時々(ときどき)))公園(こうえん)で((ジョギング(jogging)))をします。",
    "((私(わたし)は))毎朝(まいあさ)((天気(てんき)が良(よ)ければ))散歩(さんぽ)をします。",
]
sentences.forEach(it => processComponents(parseJapaneseSentence(it)));

export interface SentencePart {
    reading: string,
    furigana: string,
    optional: boolean,
    cluster: number
}

export interface AnswerCorrectness {
    readingCorrectness: boolean[];
    answerCorrectness: boolean[];
    isCorrect: boolean;
}

export interface PossibleAnswer {
    expectedAnswer: SentencePart[],
    readingMapping: number[]
    reading: string[]
    furigana: string[]
    optional: boolean[]
}

export const calculateMostLikelyCorrectness = (answer: string, referenceSentence: Sentence, sentence: SentencePart[]): {
    readingCorrectness: (boolean | null)[]
    answerCorrect: boolean
} => {
    const optionalGroups = Array.from(new Set(sentence.map((part) => part.cluster).filter(it => it !== -1)))
    const useKanji = hasKanji(answer)

    const possibleAnswers = getAllPossibleAnswers(useKanji, optionalGroups, sentence)
    let filteredPossibleAnswers = possibleAnswers.filter((possibleAnswer) => {
        const possibleAnswerIsLongerOrEqual = possibleAnswer.reading.length >= answer.length
        const allCharsInReading = possibleAnswer.reading.map((part) => part.split("")).flat()
        const possibleAnswerContainsAllAnswerCharacters = answer.split("").every((char) => allCharsInReading.includes(char))
        return possibleAnswerIsLongerOrEqual && possibleAnswerContainsAllAnswerCharacters
    })

    if (filteredPossibleAnswers.length === 0) {
        filteredPossibleAnswers = possibleAnswers
    }
    const editDistances = filteredPossibleAnswers.map((possibleAnswer) => editDistance(answer.split(""), possibleAnswer.expectedAnswer.map((part) => part.reading)))
    const mostLikelyAnswer = filteredPossibleAnswers[editDistances.indexOf(Math.min(...editDistances))]
    return calculateCorrectness(mostLikelyAnswer, referenceSentence, answer)
}

const getAllCombinations = (nums: number[]): number[][] => {
    // Base case: if the list is empty, return a list containing an empty list
    if (nums.length === 0) return [[]];

    // Remove the first element from the list
    const first = nums[0];
    const rest = nums.slice(1);

    const combinationsWithoutFirst = getAllCombinations(rest);
    const combinationsWithFirst = combinationsWithoutFirst.map(comb => [first, ...comb]);
    return combinationsWithoutFirst.concat(combinationsWithFirst);
}


export const getAllPossibleAnswers = (useKanji: boolean, optionalGroups: number[], sentence: SentencePart[]): PossibleAnswer[] => {
    // Call getExpectedAnswer for all possible combinations of optional groups
    const possibleAnswers: PossibleAnswer[] = []
    const optionalGroupsCombinations = getAllCombinations(optionalGroups)
    optionalGroupsCombinations.forEach((combination) => {
        possibleAnswers.push(getExpectedAnswer(useKanji, combination, sentence))
    })
    return possibleAnswers
}

const editDistance = (answer: string[], expectedAnswer: string[]): number => {
    const lenA = answer.length;
    const lenB = expectedAnswer.length;

    // Create a matrix to store distances
    const dp: number[][] = Array.from({length: lenA + 1}, () => Array(lenB + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= lenA; i++) dp[i][0] = i;
    for (let j = 0; j <= lenB; j++) dp[0][j] = j;

    // Compute distances
    for (let i = 1; i <= lenA; i++) {
        for (let j = 1; j <= lenB; j++) {
            const cost = answer[i - 1] === expectedAnswer[j - 1] ? 0 : 1;

            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,    // Deletion
                dp[i][j - 1] + 1,    // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );

            // Transposition
            if (i > 1 && j > 1 && answer[i - 1] === expectedAnswer[j - 2] && answer[i - 2] === expectedAnswer[j - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }

    // Return the final distance
    return dp[lenA][lenB];
}

export const calculateCorrectness = (possibleAnswer: PossibleAnswer, referenceSentence: Sentence, answer: string): {
    readingCorrectness: (boolean | null)[]
    answerCorrect: boolean
} => {
    const readingCorrectness = []
    possibleAnswer.reading.forEach((reading, index) => {
        readingCorrectness.push(reading === answer[index])
    })

    const readingMappingCorrectness: (null | boolean)[] = Array.from({length: referenceSentence.reading.length}, () => null)
    readingCorrectness.forEach((correct, index) => {
        const readingMappingIndex = possibleAnswer.readingMapping[index]
        readingMappingCorrectness[readingMappingIndex] = correct;
    })
    // console.log("Full reading", referenceSentence.reading)
    // console.log("Expected reading", possibleAnswer.reading)
    // console.log("Reading mapping", possibleAnswer.readingMapping)
    // console.log("Reading correctness: ", readingCorrectness)
    // console.log("Full reading correctness: ", readingMappingCorrectness)
    const answerCorrect = readingMappingCorrectness.every((correct) => correct === null | correct === true)
    return {
        readingCorrectness: readingMappingCorrectness,
        answerCorrect: answerCorrect
    }
}

const getExpectedAnswer = (useKanji: boolean, optionalGroups: number[], sentence: SentencePart[]): PossibleAnswer => {
    const expectedAnswer: SentencePart[] = []
    const readingMapping: number[] = []

    sentence.forEach((part, index) => {
        let textToUse = ""
        if (useKanji) {
            textToUse = part.reading
        } else {
            if (part.furigana === "") {
                textToUse = part.reading
            } else {
                textToUse = part.furigana
            }
        }
        if (part.optional && !optionalGroups.includes(part.cluster)) {
            return
        }
        textToUse.split("").forEach((readingPart) => {
            const subSentencePar: SentencePart = {
                reading: readingPart,
                furigana: "",
                optional: part.optional,
                cluster: part.cluster
            }
            expectedAnswer.push(subSentencePar)
            readingMapping.push(index)
        })
    })

    return {
        expectedAnswer: expectedAnswer,
        readingMapping: readingMapping,
        reading: expectedAnswer.map((part) => part.reading),
        furigana: expectedAnswer.map((part) => part.furigana),
        optional: expectedAnswer.map((part) => part.optional)
    }
}

