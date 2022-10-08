import Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js'

export const gameConfig = {
	type: Phaser.AUTO,
	scale: {
		parent: 'game',
		height: 300,
		with: 500,
		mode: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		// default: 'arcade',
		// arcade: {
		// 		debug: false,
		// 		enabled: true,
		// 		gravity: { y: 1000 },
		// 		showBody: true,
		// 		showStaticBody: true,
		// 		debugBodyColor: 0xff00ff,
		// },
	},
	scene: [GameScene],
	plugins: {
		global: [
			{
				key: 'rexWebFontLoader',
				plugin: WebFontLoaderPlugin,
				start: true,
			},
		],
	},
}

export const SCENES = {
	GAME: 'GameScene',
}
