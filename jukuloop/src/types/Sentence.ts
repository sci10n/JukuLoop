export interface Sentence {
    raw: string;
    reading: string[];
    furigana: string[];
    translation: string;
    note?: string;
    hint?: string;
}