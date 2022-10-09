# AirConsole Boilerplate

## Installation

To get started it is required to install both [NodeJS](https://nodejs.org/en) and [NPM](https://www.npmjs.com). It is recommended to use [nvm](https://github.com/nvm-sh/nvm) for version managed. The required NodeJS version is stated in [nvmrc](.nvmrc).

Verify the correct version is installed by typing `node -v`, `npm -v` which prints the version in use.

Run `npm install`. On success a `node_modules` folder containing all installed packages defined in [package.json](package.json) is created.

## Scripts

Builds the project and exports files into the `/dist/` directory which contains all necessary build files.

```
npm run build
```

Watch src files and runs webpack to export files accordingly to changes.

```
npm run watch
```

Runs a dev server on port 8887 defined in [webpack.config.js](webpack.config.js) and reloads the browser on `/dist/` changes.

```
npm run serve
```

## Technologies used

- TypeScript
- CSS
- PhaserJS
- AirConsole
- NodeJS
- NPM
- webpack
- prettier

## Noteworthy

[NodeJS](https://nodejs.org/en/)  
[NPM](https://www.npmjs.com/)  
[AirConsole | Get Started](https://developers.airconsole.com/#!/getting_started)  
[PhaserJS | Get Started](https://phaser.io/tutorials/getting-started-phaser3)
