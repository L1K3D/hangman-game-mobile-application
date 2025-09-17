# Hangman Game Mobile Application — Project Overview and Technical Explanation

This repository contains a compact React Native application implemented with the
Expo toolchain that reproduces the classic Hangman word-guessing game with a
Formula 1 themed word list. The application is intentionally small and
self-contained, making it suitable as a learning project or a lightweight
mobile game prototype.

This document provides a formal and comprehensive explanation of the project's
purpose, architecture, data structures, component responsibilities, runtime
behavior, development and execution instructions, and suggested improvements.

1. Purpose and high-level description
------------------------------------
The application presents a single-player Hangman game. On each round the app
selects a word and hint from an internal dataset. The player tries to guess the
word by entering individual letters. Correct guesses reveal matching letters in
the displayed word; incorrect guesses increment a counter that causes the
graphical hangman to progress. The game finishes when the player either
successfully reveals the entire word (win) or accumulates a predefined number
of incorrect guesses (lose).

2. Project structure and responsibilities
----------------------------------------
Top-level files and folders relevant to this explanation:

- `package.json` — Project manifest. Declares Expo-based start scripts and
	essential dependencies (Expo SDK, React, and React Native versions).
- `js/` — Primary JavaScript source directory.
	- `App.js` — Root React component that implements the game flow and UI.
	- `index.js` — Expo entry point that registers the app (standard for RN/Expo
		projects; not described in detail in this explanation but present in the
		repository manifest as the `main` export).
	- `components/HangmanDisplay.js` — Presentational component that renders a
		single hangman image based on the number of incorrect guesses.
	- `data/words.js` — In-memory dataset containing the words and corresponding
		hints used by the game.
	- `styles/styles.js` — Centralized StyleSheet for visual styling of the UI.
- `assets/` — Contains image assets used by `HangmanDisplay` and app icons.

3. File-by-file explanation (code behavior and data flow)
--------------------------------------------------------

3.1 `js/App.js`

This is the application’s root component and orchestrates the gameplay. The
component uses React functional components and hooks to manage local state. The
main responsibilities are:

- Game initialization: On mount (via `useEffect` with an empty dependency
	array), `startNewGame()` is called to select a new random word object from
	`words.js` and to clear prior state.
- State tracked by the component:
	- `currentWord` (string): The active word to guess. Stored in uppercase.
	- `hint` (string): The accompanying hint text for the current word.
	- `guessedLetters` (string[]): List of uppercase single-character letters the
		player has guessed correctly.
	- `wrongGuesses` (number): Count of incorrect letter guesses.
	- `input` (string): Local controlled value for the TextInput field (single
		character expected).
	- `lastWord` (string): Stores the previous round's word to avoid immediate
		repetition when picking a new random word.

- `startNewGame()` selects a random entry from `words`. Selection logic avoids
	picking the same word as the immediate previous round. It writes the new
	word and hint to state and resets `guessedLetters`, `wrongGuesses`, and
	`input`.
- `handleGuess()` normalizes the `input` value to uppercase, clears the input
	field, ignores empty or previously guessed letters, and either appends the
	letter to `guessedLetters` (on correct guess) or increments `wrongGuesses`
	(on incorrect guess).
- Display logic:
	- `displayWord` is derived by splitting `currentWord` into characters and
		mapping each character to itself when included in `guessedLetters`, or to
		an underscore `_` when hidden. Characters are joined with a space for
		legibility.
	- Win condition: there are no underscore placeholders left in `displayWord`.
	- Lose condition: `wrongGuesses` reaches or exceeds the configured limit
		(6 in the current implementation).

- Rendering:
	- The component renders a title, the hint text, the `HangmanDisplay`
		component (passing `wrongGuesses` as `errors`), and the masked word.
	- When the game is active (not won or lost) a `TextInput` and a "Try Letter"
		button are displayed. When the game ends a result message and "Play Again"
		button are displayed which call `startNewGame()`.

3.2 `js/components/HangmanDisplay.js`

This presentational component receives a numeric `errors` prop and maps it to
an ordered array of static image references using `require`. The component
returns a single `<Image>` element with the chosen asset as the `source`.

Key behavior:
- The `errors` prop is used directly as an array index. The images are ordered
	from the first hangman part (head) to the final part (left leg). Changing
	the `errors` value updates the displayed part.
- Images are static requires which ensures they are included in the bundled
	application binary and can be referenced synchronously at runtime.

3.3 `js/data/words.js`

This module exports a simple array named `words`. Each element is an object of
the shape `{ word: string, hint: string }`. The game expects `word` values to
be uppercase; this simplifies comparison logic with single-letter guesses.

3.4 `js/styles/styles.js`

This module centralizes UI styles using `StyleSheet.create`. Each exported key
maps to a particular UI element (container, title, hint, word display, input,
button, etc.). The styles use a dark theme with a red accent color for
prominence.

4. Runtime prerequisites and how to run
-------------------------------------
This project uses the Expo-managed workflow. Basic prerequisites:

- Node.js (16.x or later recommended)
- npm or yarn
- Expo CLI (optional globally; can be used via `npx expo`)
- For device testing: Expo Go on a mobile device or an Android/iOS simulator.

Typical development steps (PowerShell on Windows):

1. Install dependencies:

	 npm install

2. Start the Expo development server:

	 npm start

	 This invokes `expo start`, which opens the Expo developer tools and starts
	 the Metro bundler. Use the developer tools to run on a connected device,
	 emulator, or the web.

3. Interact with the app: open in Expo Go on a real device or run an emulator
	 to validate UI and gameplay.

5. Testing, validation and static checks
---------------------------------------
Because the project is small, the most effective validation is to run the
application through the Expo bundler which will reveal any JSX or runtime
errors. For a more formal development process, consider:

- Adding unit tests for the game logic (e.g., functions that compute
	`displayWord` or determine win/lose conditions). Use a test runner such as
	Jest.
- Adding ESLint with a React Native configuration to catch common issues and
	enforce a consistent code style.

Example minimal unit test idea:
- Test the `displayWord` logic given a word and a set of guessed letters,
	ensuring that letters are revealed correctly and placeholders are inserted
	where appropriate.

6. Edge cases and implementation notes
--------------------------------------
- Input validation: The `TextInput` is limited with `maxLength={1}`, but the
	app performs only minimal validation (empty or repeated guesses are ignored).
	Additional validation could sanitize non-alphabetic input.
- Index safety: `HangmanDisplay` uses `errors` as a direct index into the
	image array. The external logic should ensure `errors` is within range.
- Internationalization: Word and hint strings are currently hard-coded in
	English/Portuguese names and may require localization for broader audiences.

7. Suggested improvements and next steps
--------------------------------------
- Add a simple state persistence layer (for example, `AsyncStorage`) to allow
	resuming a game after the app is closed.
- Expand the word dataset and implement categories so the player can choose a
	theme (teams, drivers, circuits, etc.).
- Improve UX for guessing multiple letters, show previously guessed letters,
	and prevent guessing non-alphabet characters.
- Add tests for core functions and integrate a CI pipeline that runs lint and
	tests on each change.

8. Concluding remarks
---------------------
This project is a succinct and instructive example of a React Native app that
implements game mechanics, asset management, and a simple UI using Expo. The
codebase is intentionally compact to make it easy to understand and extend.