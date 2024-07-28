import type {Deck, Sentence} from "./Sentence";
import moment from "moment";

export enum Stage {
    'Apprentice1',
    'Apprentice2',
    'Apprentice3',
    'Apprentice4',
    'Guru1',
    'Guru2',
    'Master',
    'Enlightened',
    'Burned'
}

const srs_timings_hours = (stage: Stage, accelerate: boolean = false): number => {
    switch (stage) {
        case Stage.Apprentice1:
            return accelerate ? 2 : 4
        case Stage.Apprentice2:
            return accelerate ? 4 : 8
        case Stage.Apprentice3:
            return accelerate ? 8 : 24
        case Stage.Apprentice4:
            return accelerate ? 24 : 48
        case Stage.Guru1:
            return 96
        case Stage.Guru2:
            return 192
        case Stage.Master:
            return 384
        case Stage.Enlightened:
            return 768
        case Stage.Burned:
            return 1536
    }

}

const next_stage = (stage: Stage, incorrect_adjustment_type: number): Stage => {
    const srs_penalty_factor = stage > Stage.Guru1 ? 2 : 1

    return stage - (incorrect_adjustment_type * srs_penalty_factor)
}

export const adjust_srs = (srs: SRS, correct: boolean): SRS => {
    const incorrect_adjustment_type = srs.stage > Stage.Guru1 ? 2 : 1
    const current_stage = srs.stage
    const new_stage = Math.max(0, correct ? current_stage + 1 : next_stage(current_stage, incorrect_adjustment_type))
    const now = new Date()
    const hours = srs_timings_hours(new_stage, true)
    return {
        stage: new_stage,
        nextReview: correct ? moment(now).add(hours, 'hours').toDate() : srs.nextReview,
        lastReview: now,
        streak: correct ? srs.streak + 1 : 0,
        maxStreak: Math.max(srs.maxStreak, srs.streak)
    }
}

export const pick_sentences = (deck: Deck, now: Date = new Date()): Sentence[] => {
    //  new Date(sentence.srs!.nextReview) < now &&
    const next = deck.sentences.filter(sentence => sentence.srs?.stage !== Stage.Burned)
    return next
}

export interface SRS {
    stage: Stage
    nextReview: Date
    lastReview: Date
    streak: number
    maxStreak: number
}