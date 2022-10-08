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
	}

	create() {}
}
