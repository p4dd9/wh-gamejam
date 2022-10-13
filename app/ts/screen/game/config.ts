import Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js'

export const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		parent: 'game',
		mode: Phaser.Scale.RESIZE,
	},
	backgroundColor: '#00AEDC',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 100 },
			debug: false,
		},
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
