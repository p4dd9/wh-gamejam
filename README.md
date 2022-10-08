# AirConsole Boilerplate

## Installation

To get started it is required to install both [NodeJS](https://nodejs.org/en) and [NPM](https://www.npmjs.com) (which ships with NodeJS). It is recommended to use [nvm](https://github.com/nvm-sh/nvm) for version managed. The required NodeJS version is stated in [nvmrc](.nvmrc). A shortcut to use the defined NodeJS version when `nvm` is installed is `nvm use`. Ensure the desired version is in use by typing `node -v` which prints the version in use (same goes for `npm -v`).

Next, it is required to install all in use. Run `npm install`, if the task is successfull a `node_modules` folder containing all installed packages is created.

## Scripts

Builds the project and exports files into `/dist/` which contains all necessary build files.

```
npm run build
```

Watch files src files and runs webpack to export files accordingly to changes.

```
npm run watch
```

Runs a dev server on port 8887 defined in [webpack.config.js](webpack.config.js) and reloads the browser on `/dist/`.

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
