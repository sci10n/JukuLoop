import * as wanakana from 'wanakana';

export const hasKanji = (input: string) => input.match(/[\u3400-\u9FAF]/) !== null
export const convertToKana = (romaji: string) => wanakana.toKana(romaji, {IMEMode: true})
export const cleanupInput = (input) => input.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~\u3000-\u303f]/g, "")

