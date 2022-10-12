import { SCENES } from '../config'

export class LobbyScene extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.LOBBY })
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

	create() {
		this.add.text(20, 20, 'Connecting Device', { font: '64px Courier', color: 'white' })

	}
}
