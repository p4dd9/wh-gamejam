import { Character, PlayerInputs, Score } from '../../../shared/common'
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
	DONUT_ITEM_IMAGE,
	DUCK_SCORE_TEXT,
	TOUCAN_SCORE_TEXT,
	UNICORN_SCORE_TEXT,
	FLAMINGO_SCORE_TEXT,
	SCHOKIBON_ITEM_IMAGE,
	SIMPLE_SCHOKIBON_POINTS,
} from '../../consts'
import { SCENES } from '../config'

export class GameScene extends Phaser.Scene {
	private donuts: Phaser.GameObjects.Group | null = null
	private schokibons: Phaser.GameObjects.Group | null = null
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

		this.load.image(DONUT_ITEM_IMAGE, 'assets/donut.png')
		this.load.image(SCHOKIBON_ITEM_IMAGE, 'assets/schokibon.png')

		this.load.image(BACKGROUND_PATTERN_IMAGE, 'assets/background_water.png')
	}

	create(airconsole: AirConsole) {
		const sceneWidth = this.game.canvas.width
		const sceneHeight = this.game.canvas.height

		this.add.tileSprite(0, 0, sceneWidth, sceneHeight, BACKGROUND_PATTERN_IMAGE).setOrigin(0, 0)

		const flamingo = this.initCharacter('flamingo')
		const duck = this.initCharacter('duck')
		const unicorn = this.initCharacter('unicorn')
		const toucan = this.initCharacter('toucan')

		flamingo.body.world.on('worldbounds',
			(body: Phaser.Physics.Arcade.Body) => {
				// Check if the body's game object is the sprite you are listening for
				if (body.gameObject === flamingo) {
					// update physics
					flamingo.setAngularVelocity(this.getRandomAngularVelocity())
					flamingo.body.velocity.x -= 300
				}
			},
			flamingo)

		duck.body.world.on('worldbounds',
			(body: Phaser.Physics.Arcade.Body) => {
				// Check if the body's game object is the sprite you are listening for
				if (body.gameObject === duck) {
					// update physics
					duck.setAngularVelocity(this.getRandomAngularVelocity())
					duck.body.velocity.x -= 300
				}
			},
			duck)

		unicorn.body.world.on('worldbounds',
			(body: Phaser.Physics.Arcade.Body) => {
				// Check if the body's game object is the sprite you are listening for
				if (body.gameObject === unicorn) {
					// update physics
					unicorn.setAngularVelocity(this.getRandomAngularVelocity())
					unicorn.body.velocity.x -= 300
				}
			},
			unicorn)

		toucan.body.world.on('worldbounds',
			(body: Phaser.Physics.Arcade.Body) => {
				// Check if the body's game object is the sprite you are listening for
				if (body.gameObject === toucan) {
					// update physics
					toucan.setAngularVelocity(this.getRandomAngularVelocity())
					toucan.body.velocity.x -= 300
				}
			},
			toucan)

		const characters = this.add.group([flamingo, unicorn, duck, toucan])
		this.donuts = this.add.group()
		this.schokibons = this.add.group()

		this.playerCharacters = characters.getChildren() as Phaser.GameObjects.Sprite[]

		this.physics.add.collider(characters, this.donuts, (character, donut) => {
			this.handleDonutCharacterCollisions(donut, character)
		})

		this.physics.add.collider(characters, this.schokibons, (character, schokibon) => {
			this.handleSchokibonCharacterCollisions(schokibon, character)
		})

		airconsole.onConnect = function (device_id) {
			for (const character of characters.getChildren() as Phaser.GameObjects.Sprite[]) {
				if (!character.getData('assigned')) {
					character.setData('assigned', {
						player: device_id,
					})
					character.setVisible(true)
					character.setActive(true)

					airconsole.message(device_id, { joinedState: 'success', character: character.name as Character })
					return
				}
			}
			airconsole.message(device_id, { joinedState: 'full' })
		}

		airconsole.onDisconnect = (device_id) => {
			for (const character of this.playerCharacters) {
				if (character.getData('assigned') && character.getData('assigned').player === device_id) {
					character.setData('assigned', null)
					character.setVisible(false)
					character.setActive(false)
				}
			}
			airconsole.message(device_id, { joinedState: 'disconnected' })
		}

		airconsole.onMessage = (from, data: PlayerInputs) => {
			if (data.START) {
				this.start(airconsole)
			}
		}
	}

	onGameEnd() {
		const flamingoScore = {
			character: FLAMINGO_CHARACTER,
			score: this.children.getByName(FLAMINGO_SCORE_TEXT)?.getData('score') as number,
		}
		const toucanScore = {
			character: TOUCAN_CHARACTER,
			score: this.children.getByName(TOUCAN_SCORE_TEXT)?.getData('score') as number,
		}

		const unicornScore = {
			character: UNICORN_CHARACTER,
			score: this.children.getByName(UNICORN_SCORE_TEXT)?.getData('score') as number,
		}

		const duckScore = {
			character: DUCK_CHARACTER,
			score: this.children.getByName(DUCK_SCORE_TEXT)?.getData('score') as number,
		}

		const scores: Score[] = [flamingoScore, toucanScore, unicornScore, duckScore]
			.sort((a, b) => a.score - b.score)
			.reverse()

		alert(`${scores[0].character} won with ${scores[0].score}`)
	}

	upscaleCharacter(character: Phaser.GameObjects.Sprite) {
		if (character.scale < 1.5) {
			character.setScale(character.scale + 0.1)
		}
	}

	downscaleCharacter(character: Phaser.GameObjects.Sprite) {
		character.setScale(character.scale - 0.1)
	}

	initCharacter(character: Character) {
		const sceneWidth = this.game.canvas.width
		const sceneHeight = this.game.canvas.height

		const sceneHorizontalCenter = sceneWidth / 2
		const sceneVerticalCenter = sceneHeight / 2
		switch (character) {
			case 'duck': {
				const duck = this.physics.add
					.sprite(sceneHorizontalCenter + 100, sceneVerticalCenter, DUCK_CHARACTER_IMAGE)
					.setScale(0.5)
					.setName(DUCK_CHARACTER)
					.setData('assigned', null)
					.setVelocity(0, 0)
					.setAngularVelocity(this.getRandomAngularVelocity())
					.setBounce(1, 1)
					.setCollideWorldBounds(true)
					.setVisible(false)
					.setActive(false)
				return duck
			}
			case 'flamingo': {
				const flamingo = this.physics.add
					.sprite(sceneHorizontalCenter - 300, sceneVerticalCenter, FLAMINGO_CHARACTER_IMAGE)
					.setScale(0.5)
					.setName(FLAMINGO_CHARACTER)
					.setData('assigned', null)
					.setVelocity(0, 0)
					.setAngularVelocity(this.getRandomAngularVelocity())
					.setBounce(1, 1)
					.setCollideWorldBounds(true)
					.setVisible(false)
					.setActive(false)
				return flamingo
			}
			case 'unicorn': {
				const unicorn =  this.physics.add
					.sprite(sceneHorizontalCenter - 100, sceneVerticalCenter, UNICORN_CHARACTER_IMAGE)
					.setScale(0.5)
					.setName(UNICORN_CHARACTER)
					.setData('assigned', null)
					.setVelocity(0, 0)
					.setAngularVelocity(this.getRandomAngularVelocity())
					.setBounce(1, 1)
					.setCollideWorldBounds(true)
					.setVisible(false)
					.setActive(false)
				return unicorn
			}
			case 'toucan': {
				const toucan = this.physics.add
					.sprite(sceneHorizontalCenter + 300, sceneVerticalCenter, TOUCAN_CHARACTER_IMAGE)
					.setScale(0.5)
					.setName(TOUCAN_CHARACTER)
					.setData('assigned', null)
					.setVelocity(0, 0)
					.setAngularVelocity(this.getRandomAngularVelocity())
					.setBounce(1, 1)
					.setCollideWorldBounds(true)
					.setVisible(false)
					.setActive(false)
				return toucan
			}
		}
	}

	getRandomAngularVelocity() {
		let velocity = [60, -60]
		return velocity[Phaser.Math.Between(0, 1)]
	}

	updateScore(characterName: Character, points: number) {
		switch (characterName) {
			case 'toucan': {
				const text = this.children.getByName(TOUCAN_SCORE_TEXT) as Phaser.GameObjects.Text
				const newText = text?.getData('score') + points
				text.setData('score', text?.getData('score') + points)
				text.setText('Toucan: ' + newText)
				break
			}
			case 'duck': {
				const text = this.children.getByName(DUCK_SCORE_TEXT) as Phaser.GameObjects.Text
				const newText = text?.getData('score') + points
				text.setData('score', text?.getData('score') + points)
				text.setText('Duck: ' + newText)
				break
			}
			case 'flamingo': {
				const text = this.children.getByName(FLAMINGO_SCORE_TEXT) as Phaser.GameObjects.Text
				const newText = text?.getData('score') + points
				text.setData('score', text?.getData('score') + points)
				text.setText('Flamingo: ' + newText)
				break
			}
			case 'unicorn': {
				const text = this.children.getByName(UNICORN_SCORE_TEXT) as Phaser.GameObjects.Text
				const newText = text?.getData('score') + points
				text.setData('score', text?.getData('score') + points)
				text.setText('Unicorn: ' + newText)
				break
			}
		}
	}

	handleDonutCharacterCollisions(
		donut: Phaser.Types.Physics.Arcade.GameObjectWithBody,
		character: Phaser.Types.Physics.Arcade.GameObjectWithBody
	) {
		donut.destroy()
		this.upscaleCharacter(character as Phaser.GameObjects.Sprite)

		this.time.addEvent({
			delay: 5000,
			callback: () => this.downscaleCharacter(character as Phaser.GameObjects.Sprite),
			loop: false,
		})
		this.updateScore(character.name as Character, 1)
	}

	handleSchokibonCharacterCollisions(
		schokibon: Phaser.Types.Physics.Arcade.GameObjectWithBody,
		character: Phaser.Types.Physics.Arcade.GameObjectWithBody
	) {
		schokibon.destroy()
		this.updateScore(character.name as Character, SIMPLE_SCHOKIBON_POINTS)
	}

	spawnDonut() {
		const spawnXpadding = 50
		const randomXPos = Phaser.Math.Between(spawnXpadding, this.game.canvas.width - spawnXpadding)

		const donut = this.physics.add.sprite(randomXPos, 150, DONUT_ITEM_IMAGE).setScale(0.5)
		donut.setCollideWorldBounds(true)
		donut.body.onWorldBounds = true
		donut.body.world.on(
			'worldbounds',
			function (body: Phaser.Physics.Arcade.Body) {
				// Check if the body's game object is the sprite you are listening for
				if (body.gameObject === donut) {
					// Stop physics and render updates for this object
					donut.destroy()
				}
			},
			donut
		)
		this.donuts?.add(donut)
	}

	spawnSchokibon() {
		const spawnXpadding = 50
		const randomXPos = Phaser.Math.Between(spawnXpadding, this.game.canvas.width - spawnXpadding)

		const schokibon = this.physics.add.sprite(randomXPos, 150, SCHOKIBON_ITEM_IMAGE).setScale(0.1).setRotation(-90)
		schokibon.setCollideWorldBounds(true)
		schokibon.body.onWorldBounds = true
		schokibon.body.world.on(
			'worldbounds',
			function (body: Phaser.Physics.Arcade.Body) {
				// Check if the body's game object is the sprite you are listening for
				if (body.gameObject === schokibon) {
					// Stop physics and render updates for this object
					schokibon.destroy()
				}
			},
			schokibon
		)
		this.schokibons?.add(schokibon)
	}

	drawScores() {
		this.add
			.text(50, 50, 'Flamingo: 0', {
				fontFamily: 'Luckiest Guy',
				fontSize: '48px',
				color: '#fa6493',
				align: 'left',
			})
			.setName(FLAMINGO_SCORE_TEXT)
			.setData('score', 0)
			.setResolution(3)
		this.add
			.text(50, this.game.canvas.height-50, 'Duck: 0', {
				fontFamily: 'Luckiest Guy',
				fontSize: '48px',
				color: '#f5e93c',
				align: 'left',
			})
			.setName(DUCK_SCORE_TEXT)
			.setData('score', 0)
			.setOrigin(0, 1)
			.setResolution(3)
		this.add
			.text(this.game.canvas.width-50, 50, 'Toucan: 0', {
				fontFamily: 'Luckiest Guy',
				fontSize: '48px',
				color: '#414545',
				align: 'left',
			})
			.setName(TOUCAN_SCORE_TEXT)
			.setData('score', 0)
			.setOrigin(1, 0)
			.setResolution(3)
		this.add
			.text(this.game.canvas.width-50, this.game.canvas.height-50, 'Unicorn: 0', {
				fontFamily: 'Luckiest Guy',
				fontSize: '48px',
				color: '#FFFFFF',
				align: 'left',
			})
			.setName(UNICORN_SCORE_TEXT)
			.setData('score', 0)
			.setOrigin(1, 1)
			.setResolution(3)
	}

	setStartCharacterPosition() {
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
	}

	start(airconsole: AirConsole) {
		this.setStartCharacterPosition()
		this.drawScores()

		this.time.addEvent({
			delay: 180000, // 180000 3 min
			callback: () => this.onGameEnd(),
		})

		this.time.addEvent({
			delay: 3500,
			callback: () => this.spawnDonut(),
			loop: true,
		})

		this.time.addEvent({
			delay: 2000, // ms
			callback: () => this.spawnSchokibon(),
			//args: [],
			// callbackScope: thisArg,
			loop: true,
		})

		airconsole.onMessage = (from, data: PlayerInputs) => {
			for (const character of this.playerCharacters) {
				if (character.getData('assigned') && from === character.getData('assigned').player) {
					if (data.MOVE === 'left') {
						character.body.velocity.x -= 150
					} else if (data.MOVE === 'right') {
						character.body.velocity.x += 150
					}
				}
			}
		}
	}
}
