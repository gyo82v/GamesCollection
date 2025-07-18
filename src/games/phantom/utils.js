import { wordsItalian } from "./WordsItalian";
import { wordsEnglish } from "./WordsEnglish";

export const getRandomWord = (lang = "eng") => {
    const wordLang = lang === "eng" ? wordsEnglish : wordsItalian
    const randomWord = wordLang[Math.floor(Math.random() * wordLang.length)]
    return randomWord
}
