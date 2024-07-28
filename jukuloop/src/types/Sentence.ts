import type {SRS} from "./Srs";
import {Stage} from "./Srs";

export interface Sentence {
    raw: string
    reading: string[]
    furigana: string[]
    translation: string
    note?: string
    hint?: string
    srs?: SRS
}

export interface Deck {
    sentences: Sentence[]
    name: string
    description: string
}


export const placeholderSentence: Sentence = {
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
    sentences: [placeholderSentence],
    name: "Placeholder deck",
    description: "This is a placeholder deck"
}
