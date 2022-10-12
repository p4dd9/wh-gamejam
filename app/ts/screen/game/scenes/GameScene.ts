import {
	BACKGROUND_PATTERN_IMAGE,
	DUCK_CHARACTER_IMAGE,
	FLAMINGO_CHARACTER_IMAGE,
	TOUCAN_CHARACTER_IMAGE,
	UNICORN_CHARACTER_IMAGE,
} from '../../consts'
import { SCENES } from '../config'

export class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.GAME })
	}

	init(airconsole: AirConsole) {
		/**
		 * SAMPLE: receive message from SCREEN
		 */
		airconsole.onMessage = function (from, data) {
			alert(`received message from ${from}, ${data}`)
		}
	}

	preload() {
		/**
		 * Fixes an issue that sometimes google fonts are
		 * not rendered instantly or not at all.
		 */
		// @ts-ignore
		this.load.rexWebFont({
			google: {
				families: ['Luckiest Guy'],
			},
		})
		this.load.image(FLAMINGO_CHARACTER_IMAGE, 'assets/flamingo.png')
		this.load.image(TOUCAN_CHARACTER_IMAGE, 'assets/toucan.png')
		this.load.image(UNICORN_CHARACTER_IMAGE, 'assets/unicorn.png')
		this.load.image(DUCK_CHARACTER_IMAGE, 'assets/duck.png')

		this.load.image(BACKGROUND_PATTERN_IMAGE, 'assets/background_water.png')
	}

	create() {
		const sceneWidth = this.game.canvas.width
		const sceneHeight = this.game.canvas.height

		const sceneHorizontalCenter = sceneWidth / 2

		const startLanesY = this.game.canvas.height * 0.8

		this.add.tileSprite(0, 0, sceneWidth, sceneHeight, BACKGROUND_PATTERN_IMAGE).setOrigin(0, 0)

		this.add.sprite(sceneHorizontalCenter - 300, startLanesY, FLAMINGO_CHARACTER_IMAGE).setScale(0.5)
		this.add.sprite(sceneHorizontalCenter - 100, startLanesY, UNICORN_CHARACTER_IMAGE).setScale(0.5)
		this.add.sprite(sceneHorizontalCenter + 100, startLanesY, DUCK_CHARACTER_IMAGE).setScale(0.5)
		this.add.sprite(sceneHorizontalCenter + 300, startLanesY, TOUCAN_CHARACTER_IMAGE).setScale(0.5)
	}
}
