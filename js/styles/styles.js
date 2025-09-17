// styles.js
//
// Centralized StyleSheet for the Hangman UI. Each key below maps to a
// component or visual element in the app. Styles are kept in a single file
// so they can be easily reused and adjusted for theme changes.

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Root container that centers content and sets background color.
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D', // deep black background
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Title shown at the top of the app. Uppercased, bright color, bold.
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E10600', // accent red
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },

    // Hint text under the title; smaller and muted color for secondary info.
    hint: {
        fontSize: 18,
        color: '#CCCCCC',
        marginBottom: 10,
        textAlign: 'center',
    },

    // The masked word display: larger font, letter spacing for clarity.
    word: {
        fontSize: 32,
        color: '#FFFFFF',
        letterSpacing: 6,
        marginVertical: 20,
        fontWeight: '600',
    },

    // Single-letter input style for guessing. Narrow fixed width to keep a
    // single-character appearance and centered text.
    input: {
        borderWidth: 2,
        borderColor: '#E10600',
        borderRadius: 8,
        padding: 10,
        width: 60,
        textAlign: 'center',
        fontSize: 24,
        color: '#FFFFFF',
        backgroundColor: '#1A1A1A',
        marginBottom: 10,
    },

    // Primary button used for actions like "Try Letter" or "Play Again".
    button: {
        backgroundColor: '#E10600',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
    },

    // Text inside the primary button: bold and uppercase for emphasis.
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    // Result text shown after win/lose (gold color for win or attention color).
    result: {
        fontSize: 24,
        color: '#FFD700', // gold color
        marginVertical: 20,
        fontWeight: 'bold',
    },

    // Shared image style for the hangman illustration. Uses contain to preserve
    // aspect ratio and centers vertically with margin.
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 20,
    },
});