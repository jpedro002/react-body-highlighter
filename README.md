# [react-body-highlighter](https://www.npmjs.com/package/react-body-highlighter)

[![CI](https://github.com/GV79/react-body-highlighter/actions/workflows/main.yml/badge.svg)](https://github.com/GV79/react-body-highlighter/actions/workflows/main.yml)
[![Deploy](https://github.com/GV79/react-body-highlighter/actions/workflows/deploy.yml/badge.svg)](https://github.com/GV79/react-body-highlighter/actions/workflows/deploy.yml)
[![Npm Version][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

This package was created to have a body highlighter component compatible with React.js with minimal dependencies and some extra props for further functionality. The SVG polygons were leveraged from the React Native package [react-native-body-highlighter](https://github.com/HichamELBSI/react-native-body-highlighter).

<p align="center">
  <img width="260" src="https://raw.githubusercontent.com/GV79/react-body-highlighter/master/image/anterior-example.png" alt="React Body Highlighter">
</p>

## Demo

🚀 **[Live Demo](https://gv79.github.io/react-body-highlighter/)** - Try the interactive example

## Requirements

This package is compatible with React 18+ and React 19. It supports:

- **React 18+**: Full compatibility with concurrent features, Suspense, and new APIs
- **React 19**: Ready for the latest React features and improvements  
- **TypeScript**: Built with TypeScript for excellent developer experience
- **Modern bundlers**: Works with Vite, Webpack, Rollup, and others

## Installation

```sh
$ npm install react-body-highlighter
```

```sh
$ yarn add react-body-highlighter
```

## Usage

**Example**

[CodeSandbox](https://codesandbox.io/s/festive-swanson-995db?file=/src/App.tsx)

```ts
import React from 'react';
import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';

export default function Component() {
  const data: IExerciseData[] = [
    { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
    { name: 'Push Ups', muscles: ['chest'] },
  ];
  
  const handleClick = React.useCallback(({ muscle, data }: IMuscleStats) => {
    const { exercises, frequency } = data;

    alert(`You clicked the ${muscle}! You've worked out this muscle ${frequency} times through the following exercises: ${JSON.stringify(exercises)}`)

  }, [data]);

  return (
    <Model
      data={data}
      style={{ width: '20rem', padding: '5rem' }}
      onClick={handleClick}
    />
  );
}
```

## Props

All props are optional so if they are not passed to the component, they will fallback to default values or be undefined.

| Prop              | Purpose                                                                                     | Type             | Default                  |
| ----------------- | ------------------------------------------------------------------------------------------- | ---------------- | -----------------------  |
| bodyColor         | Default color of unworked body muscle                                                       | String           | `#B6BDC3`                |
| data              | Data array containing exercise JSON objects: `{ name: 'Bicep Curl', muscles: ['biceps'] }`. While the `name` and `muscles` attributes are required, you may optionally provide another attribute `frequency` to represent the exercise count/intensity.                       | Object[]         |                          |
| highlightedColors | Array containing colors to display depending on frequency a muscle was worked (array[frequency-1] = color). For an example of how this works, see the CodeSandbox example above in the *Usage* section.                                                                 | []               | `['#0984e3', '#74b9ff']` |
| onClick           | Callback when muscle is clicked. The function will get passed a JSON object of the following structure: `{ muscle: 'name', stats: { exercises: [''], frequency: 0 } }`                                                                                                 | (exercise) => {} |                         |
| style             | CSSProperties style object that gets passed to SVG's parent container (div)                 | Object           |                          |
| svgStyle          | CSSProperties style object that gets passed to SVG element                                  | Object           |                          |
| type              | Denotes type of model view (values: `anterior` or `posterior`)                              | String           | `anterior`               |

## List of muscles/parts supported

```
/* Back */
trapezius
upper-back
lower-back

/* Chest */
chest

/* Arms */
biceps
triceps
forearm
back-deltoids
front-deltoids

/* Abs */
abs
obliques

/* Legs */
adductor
hamstring
quadriceps
abductors
calves
gluteal

/* Head */
head
neck
```

## Modifying

The main SVG element has a class name `.rbh` which will allow you to manually change any styles necessary.

For example, you can add something like `.rhb polygon:hover { fill: #757782 !important; }` to your `.css` file to change the muscle color on mouse hover.

Otherwise, feel free to fork the repo and make any adjustments to your liking!

## Development

### Local Development

```sh
# Install dependencies
pnpm install

# Start the example in development mode
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test
```

### GitHub Pages Deployment

This project automatically deploys the example to GitHub Pages when changes are pushed to the main branch. The deployment workflow:

1. **Builds the library** - Compiles the TypeScript source to dist/
2. **Builds the example** - Creates a production build of the demo app
3. **Deploys to GitHub Pages** - Publishes the demo to `https://[username].github.io/react-body-highlighter/`

To set up GitHub Pages for your fork:

1. Go to your repository settings
2. Navigate to Pages section
3. Select "GitHub Actions" as the source
4. The workflow will automatically deploy on pushes to main

The demo showcases:
- Interactive muscle highlighting
- Individual muscle selection (hands, feet, ears)
- Toggle visibility of body parts
- Selected muscles list with removal functionality

[license-image]: http://img.shields.io/npm/l/react-body-highlighter.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/react-body-highlighter.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-body-highlighter
[npm-version-image]: https://img.shields.io/npm/v/react-body-highlighter.svg
[npm-version-url]: https://www.npmjs.com/package/react-body-highlighter
