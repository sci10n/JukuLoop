import * as wanakana from "wanakana";

export function convertToFuriganaFormat(inputString: string): { reading: string[], furigana: string[] } {
    // Adjusted regex to capture kanji with furigana and non-kanji characters
    const regex = /([\u3400-\u9FAF]+)[(（](.+?)[)）]|([^\u3400-\u9FAF]+)/g;
    let reading: string[] = [];
    let furigana: string[] = [];

    let match;
    while ((match = regex.exec(inputString)) !== null) {
        if (match[1] && match[2]) { // Kanji with furigana
            reading.push(match[1]);
            furigana.push(match[2]);
        } else if (match[3]) { // Non-kanji characters
            reading.push(match[3]);
            furigana.push(""); // Add an empty string for non-kanji to keep arrays aligned
        }
    }

    // Split Kana into individual characters
    const result = reading.map((reading, index) => {
        if (wanakana.isKana(reading)) {
            const newParts = reading.split("")
            return newParts.map((part) => {
                return {reading: part, furigana: ""}
            })
        }
        return [{reading: reading, furigana: furigana[index]}]
    })

    const new_reading =  result.flat().map((part) => part.reading)
    const new_furigana = result.flat().map((part) => part.furigana)
    return {reading: new_reading, furigana: new_furigana}
}

// Example usage
const input = "東京(とうきょう)は日本(にほん)の首都(しゅと)です。";
const input2 = "私（わたし）は日本語（にほんご）を話（はな）します";
console.log(convertToFuriganaFormat(input));
console.log(convertToFuriganaFormat(input2));
