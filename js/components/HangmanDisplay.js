import React from 'react';
import { Image } from 'react-native';

// HangmanDisplay: Presentational component that shows one hangman image
// based on the `errors` prop.
//
// How it works (step-by-step):
// 1. An ordered array `images` is created using `require` for each image file.
//    These `require` calls are static so the bundler includes the images in the app bundle.
// 2. The component receives a single prop, `errors`, which is used as an index
//    into the `images` array to pick which part to display.
// 3. The chosen image object is passed as the `source` prop to the React Native
//    `<Image>` component, which renders the image at the specified size.
//
// Data shapes:
// - errors: number (0-based) — index of the image to display.
// - images: array of module references returned by `require()`.

export default function HangmanDisplay({ errors }) {
  const images = [
    require('../../assets/application-images/hangman-parts/head.png'),
    require('../../assets/application-images/hangman-parts/body.png'),
    require('../../assets/application-images/hangman-parts/left-arm.png'),
    require('../../assets/application-images/hangman-parts/right-arm.png'),
    require('../../assets/application-images/hangman-parts/right-leg.png'),
    require('../../assets/application-images/hangman-parts/left-leg.png')
  ];

  // Use the `errors` number to select the corresponding image from the array.
  // The Image receives the module reference and renders it with a fixed size.
  return <Image source={images[errors]} style={{ width: 200, height: 200 }} />;
}