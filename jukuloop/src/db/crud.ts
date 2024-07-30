import type {Card, Deck} from "../types/Sentence";


export interface Crud {
    put_card: (card: Card) => Promise<Card>
    get_card: (id: string) => Promise<Card>
    delete_card: (id: string) => Promise<void>
    put_deck: (deck: Deck) => Promise<Deck>
    get_deck: (id: string) => Promise<Deck>
    delete_deck: (id: string) => Promise<void>
    add_card_to_deck: (deck_id: string, card_id: string) => Promise<Deck>
}


export const put_card = async (card: Card, crud: Crud): Promise<Card> => crud.put_card(card)
export const get_card = async (id: string, crud: Crud): Promise<Card> => crud.get_card(id)
export const delete_card = async (id: string, crud: Crud): Promise<void> => crud.delete_card(id)
export const put_deck = async (deck: Deck, crud: Crud): Promise<Deck> => crud.put_deck(deck)
export const get_deck = async (id: string, crud: Crud): Promise<Deck> => crud.get_deck(id)
export const delete_deck = async (id: string, crud: Crud): Promise<void> => crud.delete_deck(id)
export const add_card_to_deck = async (deck_id: string, card_id: string, crud: Crud): Promise<Deck> => crud.add_card_to_deck(deck_id, card_id)



export const persistence_storage_crud = (name: string) => Crud => {
    return {
        put_card: async (card: Card) => {
            const key = `${name}.card.${card.id}`
            localStorage.setItem(key, JSON.stringify(card))
            return card
        },
        get_card: async (id: string) => {
            const key = `${name}.card.${id}`
            const card = localStorage.getItem(key)
            if (card === null) {
                throw new Error(`Card with id ${id} not found`)
            }
            return JSON.parse(card)
        },
        delete_card: async (id: string) => {
            const key = `${name}.card.${id}`
            localStorage.removeItem(key)
        },
        put_deck: async (deck: Deck) => {
            const key = `${name}.deck.${deck.id}`
            localStorage.setItem(key, JSON.stringify(deck))
        },
        get_deck: async (id: string) => {
            const key = `${name}.deck.${id}`
            const deck = localStorage.getItem(key)
            if (deck === null) {
                throw new Error(`Deck with id ${id} not found`)
            }
            return JSON.parse(deck)
        },
        delete_deck: async (id: string) => {
            const key = `${name}.deck.${id}`
            localStorage.removeItem(key)
        },
        add_card_to_deck: async (deck_id: string, card_id: string) => {
            const deck_key = `${name}.deck.${deck_id}`
            const deck = localStorage.getItem(deck_key)
            if (deck === null) {
                throw new Error(`Deck with id ${deck_id} not found`)
            }
            const deck_obj = JSON.parse(deck)
            deck_obj.sentences.push(card_id)
            localStorage.setItem(deck_key, JSON.stringify(deck_obj))
            return deck_obj
        }
    }
}