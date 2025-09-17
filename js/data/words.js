// words.js
//
// Exports a list of word objects used by the Hangman game. Each entry in the
// array is an object with the following shape:
//   { word: string, hint: string }
//
// Usage:
// - `App.js` imports this array and selects a random element to start a new game.
// - The `word` value is shown to the game logic in uppercase and is compared
//   against player letter guesses.
// - The `hint` value is displayed in the UI to help the player guess the word.
//
// Important details:
// - Words are stored in uppercase to make single-letter comparisons simple and
//   case-insensitive in the UI logic.
// - Hints are free-form text and may include punctuation. They are displayed
//   directly in the app (no additional formatting is required).

export const words = [
    { word: "FERRARI", hint: "Italian Scuderia. Famous for your iconic cars and tradition." },
    { word: "MERCEDES", hint: "German team, famous for your silver arrows cars and hybrid era domination." },
    { word: "REDBULL", hint: "Austriac team, famous for your rage and agressive drivers." },
    { word: "MINARDI", hint: "Britsh team, iconic name and remeber for never being so victorious on the grid."},
    { word: "MCLAREN", hint: "Lendary Britsh team, remeber for the brazilians being the house of three World Champion titles to Ayrton Senna."},
    { word: "WILLIAMS", hint: "Historical Britsh team, remebermed by it's tradition and iconic car paints."},
    { word: "COPERSUGAR", hint: "Unic Brazilian F1 Team, remebermed for a iconic win on Interlagos in 1976 with Fittipaldi."},
    { word: "RENAULT", hint: "French team, remebermed to give two conssecutive World Champion titles to Fernando Alonso, in 2004 and 2005."},
    { word: "JORDAN", hint: "Britsh team, house of born of Schummacer, Barrichello and many other iconic drivers. Lead by a hippster Team Principal."},
    { word: "SAUBER", hint: "Suessden team, bought for many other teams name rights, will be named Audi in 2026."}
];