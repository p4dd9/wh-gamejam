import { Character } from '../../../shared/common'
import {
	FLAMINGO_CHARACTER_IMAGE,
	TOUCAN_CHARACTER_IMAGE,
	UNICORN_CHARACTER_IMAGE,
	DUCK_CHARACTER_IMAGE,
	BACKGROUND_PATTERN_IMAGE,
} from '../../consts'
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
		this.load.image(FLAMINGO_CHARACTER_IMAGE, 'assets/flamingo.png')
		this.load.image(TOUCAN_CHARACTER_IMAGE, 'assets/toucan.png')
		this.load.image(UNICORN_CHARACTER_IMAGE, 'assets/unicorn.png')
		this.load.image(DUCK_CHARACTER_IMAGE, 'assets/duck.png')

		this.load.image(BACKGROUND_PATTERN_IMAGE, 'assets/background_water.png')
	}

	create(airconsole: AirConsole) {
		const sceneWidth = this.game.canvas.width
		const sceneHeight = this.game.canvas.height

		const sceneHorizontalCenter = sceneWidth / 2
		const sceneVerticalCenter = sceneHeight / 2

		this.add.tileSprite(0, 0, sceneWidth, sceneHeight, BACKGROUND_PATTERN_IMAGE).setOrigin(0, 0)

		const flamingo = this.add
			.sprite(sceneHorizontalCenter - 300, sceneVerticalCenter, FLAMINGO_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName('Flamingo')
			.setData('assigned', null)
		const unicorn = this.add
			.sprite(sceneHorizontalCenter - 100, sceneVerticalCenter, UNICORN_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName('Unicorn')
			.setData('assigned', null)
		const duck = this.add
			.sprite(sceneHorizontalCenter + 100, sceneVerticalCenter, DUCK_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName('Duck')
			.setData('assigned', null)
		const toucan = this.add
			.sprite(sceneHorizontalCenter + 300, sceneVerticalCenter, TOUCAN_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName('Toucan')
			.setData('assigned', null)

		const characters = this.add.group([flamingo, unicorn, duck, toucan])

		airconsole.onConnect = function (device_id) {
			const playerNumber = airconsole.convertDeviceIdToPlayerNumber(device_id)

			for (const character of characters.getChildren() as Phaser.GameObjects.Sprite[]) {
				if (!character.getData('assigned')) {
					character.setData('assigned', {
						player: playerNumber,
					})
					character.setScale(2)

					airconsole.message(device_id, { joinedState: 'success', character: character.name as Character })
					return
				}
			}
			airconsole.message(device_id, { joinedState: 'full' })
		}
	}
}
