import { Character, PlayerInputs } from '../../../shared/common'
import {
	FLAMINGO_CHARACTER_IMAGE,
	TOUCAN_CHARACTER_IMAGE,
	UNICORN_CHARACTER_IMAGE,
	DUCK_CHARACTER_IMAGE,
	BACKGROUND_PATTERN_IMAGE,
	UNICORN_CHARACTER,
	DUCK_CHARACTER,
	TOUCAN_CHARACTER,
	FLAMINGO_CHARACTER,
} from '../../consts'
import { SCENES } from '../config'

export class GameScene extends Phaser.Scene {
	private playerCharacters: Phaser.GameObjects.Sprite[] = []

	constructor() {
		super({ key: SCENES.GAME })
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
			.setName(FLAMINGO_CHARACTER)
			.setData('assigned', null)
		const unicorn = this.add
			.sprite(sceneHorizontalCenter - 100, sceneVerticalCenter, UNICORN_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName(UNICORN_CHARACTER)
			.setData('assigned', null)
		const duck = this.add
			.sprite(sceneHorizontalCenter + 100, sceneVerticalCenter, DUCK_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName(DUCK_CHARACTER)
			.setData('assigned', null)
		const toucan = this.add
			.sprite(sceneHorizontalCenter + 300, sceneVerticalCenter, TOUCAN_CHARACTER_IMAGE)
			.setScale(0.5)
			.setName(TOUCAN_CHARACTER)
			.setData('assigned', null)

		const characters = this.add.group([flamingo, unicorn, duck, toucan])
		this.playerCharacters = characters.getChildren() as Phaser.GameObjects.Sprite[]

		airconsole.onConnect = function (device_id) {
			for (const character of characters.getChildren() as Phaser.GameObjects.Sprite[]) {
				if (!character.getData('assigned')) {
					character.setData('assigned', {
						player: device_id,
					})
					character.setScale(2)

					airconsole.message(device_id, { joinedState: 'success', character: character.name as Character })
					return
				}
			}
			airconsole.message(device_id, { joinedState: 'full' })
		}

		airconsole.onMessage = (from, data: PlayerInputs) => {
			if (data.START) {
				this.start(airconsole)
			}
			alert(`received message from ${from}, ${data}`)
		}
	}

	start(airconsole: AirConsole) {
		const sceneWidth = this.game.canvas.width
		const sceneHorizontalCenter = sceneWidth / 2

		const startLanesY = this.game.canvas.height * 0.8

		const flamingo = this.children.getByName(FLAMINGO_CHARACTER) as Phaser.GameObjects.Sprite
		flamingo.setPosition(sceneHorizontalCenter - 300, startLanesY).setScale(0.5)
		const unicorn = this.children.getByName(UNICORN_CHARACTER) as Phaser.GameObjects.Sprite
		unicorn.setPosition(sceneHorizontalCenter - 100, startLanesY).setScale(0.5)
		const duck = this.children.getByName(DUCK_CHARACTER) as Phaser.GameObjects.Sprite
		duck.setPosition(sceneHorizontalCenter + 100, startLanesY).setScale(0.5)
		const toucan = this.children.getByName(TOUCAN_CHARACTER) as Phaser.GameObjects.Sprite
		toucan.setPosition(sceneHorizontalCenter + 300, startLanesY).setScale(0.5)

		airconsole.onMessage = (from, data: PlayerInputs) => {
			for (const character of this.playerCharacters) {
				if (character.getData('assigned') && from === character.getData('assigned').player) {
					if (data.MOVE === 'left') {
						character.x -= 20
					} else if (data.MOVE === 'right') {
						character.x += 20
					}
				}
			}
		}
	}
}
