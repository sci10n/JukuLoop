import type {Sentence} from "../types/Sentence";
import type {SRS} from "../types/Srs";
import {parseJapaneseSentence, processComponents} from "../utils/conversionUtils";


export interface Crud {
    addOrUpdateSrs: (sentenceId: string, srs: SRS) => void
    getSrs: (sentenceId: string) => SRS | undefined
    removeSrs: (sentenceId: string) => void

    addOrUpdateSentence: (sentence: Sentence) => void
    getSentenceWithSrs: (sentenceId: string) => CardMetadata | undefined
    updateSentenceSrs: (sentenceId: string, srs: Partial<SRS>) => void
    deleteSentence: (sentenceId: string) => void

    addOrUpdateDeck: (deck: DeckMetadata) => void
    deleteDeck: (deckId: string) => void
    getDeck: (deckId: string) => DeckMetadata | undefined
    getDecks: () => DeckMetadata[]
    addSentenceToDeck: (deckId: string, sentenceId: string) => void

    removeSentenceFromDeck: (deckId: string, sentenceId: string) => void

    getSentencesForDeck: (deckId: string) => Sentence[]
}


export interface DeckMetadata {
    id: string
    name: string
    description: string
    sentenceIds: string[]
}

export interface CardMetadata {
    id: string,
    raw: string,
    translation: string
    hint?: string
    note?: string
}

const toSentence = (card: CardMetadata, srs: SRS): Sentence => {
    const parts = parseJapaneseSentence(card.raw)
    const components = processComponents(parts)
    return {
        id: card.id,
        raw: card.raw,
        ...components,
        translation: card.translation,
        hint: card.hint,
        note: card.note,
        srs: srs,
    }
}

export interface SrsStorage {
    [sentenceId: string]: SRS
}

const DECK_METADATA_KEY = 'jukuloop_deckMetadata';
const SENTENCES_KEY = 'jukuloop_sentences';
const SRS_KEY = 'jukuloop_srs';

const setItem = (key: string, value: any) => {
    try {
        const serialized = JSON.stringify(value, (k, v) => {
            if (v instanceof Date) {
                return v.toISOString()
            }
            return v
        });
        localStorage.setItem(key, serialized)
    } catch (e) {
        console.error(e)
    }
}

const getItem = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(key)
        if (item === null) {
            return defaultValue
        }
        return JSON.parse(item, (k, v) => {
                if (k === 'nextReview' || k === 'lastReview') {
                    return new Date(v)
                }
                return v
            }
        )
    } catch (e) {
        console.error(e)
        return defaultValue
    }
}


export const createStorage = (): Crud => {
    return {
        deleteSentence(sentenceId: string): void {
            const sentences = getItem<Record<string, CardMetadata>>(SENTENCES_KEY, {})
            delete sentences[sentenceId]
            setItem(SENTENCES_KEY, sentences)
        },
        addOrUpdateDeck(deck: DeckMetadata): void {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            decks[deck.id] = deck
            setItem(DECK_METADATA_KEY, decks)
        },
        deleteDeck(deckId: string): void {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            delete decks[deckId]
            setItem(DECK_METADATA_KEY, decks)
        },
        addSentenceToDeck(deckId: string, sentenceId: string): void {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            const deck = decks[deckId]
            if (deck && !deck.sentenceIds.includes(sentenceId)) {
                deck.sentenceIds.push(sentenceId)
                decks[deckId] = deck
                setItem(DECK_METADATA_KEY, decks)
            }
        },
        removeSentenceFromDeck(deckId: string, sentenceId: string): void {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            const deck = decks[deckId]
            if (deck) {
                deck.sentenceIds = deck.sentenceIds.filter(id => id !== sentenceId)
                decks[deckId] = deck
                setItem(DECK_METADATA_KEY, decks)
            }
        },
        getSentencesForDeck(deckId: string): Sentence[] {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            const deck = decks[deckId]
            if (deck) {
                const sentences = getItem<Record<string, Sentence>>(SENTENCES_KEY, {})
                return deck.sentenceIds.map(id => toSentence(sentences[id], this.getSrs(id)!))
            }
            return []
        },
        getDeck(deckId: string): DeckMetadata | undefined {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            return decks[deckId];
        },
        getDecks(): DeckMetadata[] {
            const decks = getItem<Record<string, DeckMetadata>>(DECK_METADATA_KEY, {})
            return Object.values(decks)
        },
        addOrUpdateSrs(sentenceId: string, srs: SRS): void {
            const srsStorage = getItem<SrsStorage>(SRS_KEY, {})
            srsStorage[sentenceId] = srs
            setItem(SRS_KEY, srsStorage)
        },
        getSrs(sentenceId: string): SRS | undefined {
            const srsStorage = getItem<SrsStorage>(SRS_KEY, {})
            return srsStorage[sentenceId]
        },
        removeSrs(sentenceId: string): void {
            const srsStorage = getItem<SrsStorage>(SRS_KEY, {})
            delete srsStorage[sentenceId]
            setItem(SRS_KEY, srsStorage)
        },
        addOrUpdateSentence(sentence: Sentence): void {
            const sentences = getItem<Record<string, CardMetadata>>(SENTENCES_KEY, {});
            sentences[sentence.id] = {
                id: sentence.id,
                raw: sentence.raw,
                translation: sentence.translation,
                hint: sentence.hint,
                note: sentence.note
            }
            setItem(SENTENCES_KEY, sentences)
            const srs = sentence.srs
            if (srs) {
                this.addOrUpdateSrs(sentence.id, srs)
            }
        },
        getSentenceWithSrs(sentenceId: string): Sentence | undefined {
            const cards = getItem<Record<string, CardMetadata>>(SENTENCES_KEY, {})
            const srs = this.getSrs(sentenceId)
            const card = cards[sentenceId]
            const sentence = toSentence(card, srs!)
            if (sentence && srs) {
                return {...sentence, srs}
            }
            return undefined
        },

        updateSentenceSrs(sentenceId: string, srs: Partial<SRS>): void {
            const existingSrs = this.getSrs(sentenceId)
            if (existingSrs) {
                this.addOrUpdateSrs(sentenceId, {...existingSrs, ...srs})
            }
        }

    }
}