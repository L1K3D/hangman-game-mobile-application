/*
  App.js

  Main entry component for the Hangman React Native app.

  Responsibilities:
  - Pick a random word (with hint) from `./data/words` and start a new round.
  - Track local UI/game state: the current word, revealed letters, wrong guesses, input value.
  - Render the high-level UI: hint, masked word, input control, result state, and the
    `HangmanDisplay` component which draws the hangman parts based on wrong guesses.

  Integration points (files in this project):
  - `./data/words` (array of { word, hint }) — source of words and hints.
  - `./components/HangmanDisplay` — visual hangman that receives `errors` (wrong guesses).
  - `./styles/styles` — central style sheet used by the component.

  Notes:
  - This component uses plain React hooks (useState/useEffect). It keeps all game state locally
    and does not depend on external stores or navigation.
  - The UI is intentionally simple so it works across Android / iOS in a React Native project.
*/

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { words } from './data/words';
import HangmanDisplay from './components/HangmanDisplay';
import styles from './styles/styles'

export default function App() {
  // --- State ---
  // The word to guess (uppercase expected in game logic)
  const [currentWord, setCurrentWord] = useState('');
  // A short hint shown to the player to make guessing easier
  const [hint, setHint] = useState('');
  // List of letters the player has correctly guessed so far (single uppercase chars)
  const [guessedLetters, setGuessedLetters] = useState([]);
  // Count of incorrect guesses; used to both limit attempts and drive HangmanDisplay
  const [wrongGuesses, setWrongGuesses] = useState(0);
  // Input text controlled by the TextInput; expects single letter inputs
  const [input, setInput] = useState('');
  // Remember last word used to avoid immediate repeats when starting a new game
  const [lastWord, setLastWord] = useState('');

  // On component mount, start the first game. Equivalent to componentDidMount.
  useEffect(() => {
    startNewGame();
  }, []);

  // --- Game logic helpers ---
  // Picks a random word object from `words` and initializes state for a fresh round.
  const startNewGame = () => {
    let newWordObj;
    // Ensure we don't pick the same word twice in a row (simple UX improvement)
    do {
      newWordObj = words[Math.floor(Math.random() * words.length)];
    } while (newWordObj.word === lastWord);

    // Store the chosen word and hint, and reset transient game state
    setCurrentWord(newWordObj.word);
    setHint(newWordObj.hint);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setLastWord(newWordObj.word);
    setInput('');
  };

  // Called when the player submits a letter guess (via button press)
  const handleGuess = () => {
    // Normalize input to uppercase to match words in `words` (which are expected to be uppercase)
    const letter = input.toUpperCase();
    // Clear the input field right away
    setInput('');

    // Ignore empty inputs or repeated guesses
    if (!letter || guessedLetters.includes(letter)) return;

    // If the current word contains the letter, add it to guessedLetters
    if (currentWord.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
    // Otherwise increment the wrong-guesses counter (used to lose the game)
    else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  // Prepare the masked display of the word, e.g. "H _ N G M A N"
  // We map each character to itself if guessed, otherwise to an underscore placeholder.
  const displayWord = currentWord
    .split('')
    .map((char) => (guessedLetters.includes(char) ? char : '_'))
    .join(' ');

  // Win condition: no underscores left in the masked display.
  // Lose condition: wrongGuesses reached the allowed maximum (6 here).
  const isWin = !displayWord.includes('_');
  const isLose = wrongGuesses >= 6;

  // --- Render ---
  // This component focuses on high-level structure and delegates the hangman drawing
  // to `HangmanDisplay` which receives the number of errors.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hangman F1</Text>
      {/* Show the hint to the player */}
      <Text style={styles.hint}>Hint: {hint}</Text>
      {/* Visual representation of the hangman; updates as wrongGuesses increases */}
      <HangmanDisplay errors={wrongGuesses} />
      {/* Masked word shown to the player */}
      <Text style={styles.word}>{displayWord}</Text>

      {/* While the game is active (no win/lose), show the input and guess button */}
      {!isWin && !isLose && (
        <>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            maxLength={1}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleGuess}>
            <Text style={styles.buttonText}>Try Letter</Text>
          </TouchableOpacity>
        </>
      )}

      {/* After the game finishes, show the result and allow starting a new game */}
      {(isWin || isLose) && (
        <>
          <Text style={styles.result}>
            {isWin ? '🏆 You Win!' : '❌ You Lose!'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={startNewGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}