import { CharacterName, PlayerInputs, Score } from '../../../shared/common'
import {
	BACKGROUND_PATTERN_IMAGE,
	DONUT_ITEM_IMAGE,
	BOTTOM_RIGHT,
	BOTTOM_LEFT,
	TOP_RIGHT,
	TOP_LEFT,
	WHALE,
	TURTLE,
	DOLPHINE,
	STONES,
	IMAGE_ARRAY,
	SCHOKIBON_ITEM_IMAGE,
	SCHOKIBON_POINTS,
	HORSE_ITEM_IMAGE,
	COUNTDOWN,
	BACKGROUND_AUDIO,
	SCHOKIBON_AUDIO,
	DONUT_AUDIO,
	IAD_ITEM_IMAGE,
	IAD_AUDIO,
	FLAMINGO,
	DUCK,
	TOUCAN,
	UNICORN,
	DONUT_POINTS,
} from '../../consts'
import { SCENES } from '../config'
import { Character } from '../objects/Character'

export class GameScene extends Phaser.Scene {
	private donuts: Phaser.GameObjects.Group | null = null
	private schokibons: Phaser.GameObjects.Group | null = null
	private horses: Phaser.GameObjects.Group | null = null
	private playerCharacters: Character[] = []
	private countdown: Phaser.GameObjects.Text | null = null
	private iads: Phaser.GameObjects.Group | null = null

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
		this.load.image(FLAMINGO.texture, 'assets/flamingo.png')
		this.load.image(TOUCAN.texture, 'assets/toucan.png')
		this.load.image(UNICORN.texture, 'assets/unicorn.png')
		this.load.image(DUCK.texture, 'assets/duck.png')

		this.load.image(HORSE_ITEM_IMAGE, 'assets/horse.png')
		this.load.image(DONUT_ITEM_IMAGE, 'assets/donut.png')
		this.load.image(IAD_ITEM_IMAGE, 'assets/iad.png')
		this.load.image(SCHOKIBON_ITEM_IMAGE, 'assets/schokibon.png')

		this.load.image(BACKGROUND_PATTERN_IMAGE, 'assets/background_water.png')

		this.load.audio(BACKGROUND_AUDIO, 'assets/background_audio.mp3')
		this.load.audio(SCHOKIBON_AUDIO, 'assets/schokibon_audio.mp3')
		this.load.audio(DONUT_AUDIO, 'assets/donut_audio.mp3')
		this.load.audio(IAD_AUDIO, 'assets/iad_laugh.mp3')

		this.load.image(BOTTOM_RIGHT, `assets/${BOTTOM_RIGHT}.png`)
		this.load.image(BOTTOM_LEFT, `assets/${BOTTOM_LEFT}.png`)
		this.load.image(TOP_RIGHT, `assets/${TOP_RIGHT}.png`)
		this.load.image(TOP_LEFT, `assets/${TOP_LEFT}.png`)

		this.load.image(WHALE, `assets/${WHALE}.png`)
		this.load.image(TURTLE, `assets/${TURTLE}.png`)
		this.load.image(DOLPHINE, `assets/${DOLPHINE}.png`)
		this.load.image(STONES, `assets/${STONES}.png`)
	}

	create(airconsole: AirConsole) {
		this.sound.play(BACKGROUND_AUDIO, {
			volume: 0.5,
		})
		this.drawBackground()

		const sceneWidth = this.game.canvas.width
		const sceneHeight = this.game.canvas.height

		const sceneHorizontalCenter = sceneWidth / 2
		const sceneVerticalCenter = sceneHeight / 2

		const flamingo = new Character(this, sceneHorizontalCenter - 300, sceneVerticalCenter, FLAMINGO)
		const duck = new Character(this, sceneHorizontalCenter + 100, sceneVerticalCenter, DUCK)
		const unicorn = new Character(this, sceneHorizontalCenter - 100, sceneVerticalCenter, UNICORN)
		const toucan = new Character(this, sceneHorizontalCenter + 300, sceneVerticalCenter, TOUCAN)

		const characters = this.add.group([flamingo, unicorn, duck, toucan])
		this.playerCharacters = characters.getChildren() as Character[]

		this.donuts = this.add.group()
		this.schokibons = this.add.group()
		this.horses = this.add.group()
		this.iads = this.add.group()

		this.physics.add.overlap(characters, this.donuts, (character, donut) => {
			this.handleDonutCharacterCollisions(donut, character as Character)
		})
		this.physics.add.overlap(characters, this.schokibons, (character, schokibon) => {
			this.handleSchokibonCharacterCollisions(schokibon, character as Character)
		})
		this.physics.add.collider(characters, this.iads, (character, iad) => {
			this.handleIadCharacterCollision(iad, character as Character)
		})
		this.physics.add.overlap(characters, this.horses, (character, horse) => {
			this.handleHorseCharacterOverlap(horse, character as Character)
		})

		airconsole.onConnect = (device_id) => {
			for (const character of characters.getChildren() as Phaser.GameObjects.Sprite[]) {
				console.log(character)
				if (!character.getData('assigned')) {
					character.setData('assigned', {
						player: device_id,
					})
					character.setVisible(true)
					character.setActive(true)
					this.physics.world.enable(character)

					airconsole.message(device_id, { joinedState: 'success', character: character.name as CharacterName })
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
					this.physics.world.disable(character)
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

	drawBackground() {
		const sceneWidth = this.game.canvas.width
		const sceneHeight = this.game.canvas.height

		this.add.tileSprite(0, 0, sceneWidth, sceneHeight, BACKGROUND_PATTERN_IMAGE).setOrigin(0, 0)

		for (let i = 0, y = 0; i < 3; i++) {
			let x = 0
			for (let j = 0; j < 12; j++) {
				x += 60 + Math.floor(Math.random() * (this.game.canvas.width - 30 + 1) + 0) / 9
				this.add.image(x, y + (Math.random() * (70 - 0 + 1) + 0), IMAGE_ARRAY[j % 3])
			}
			y += this.game.canvas.height / 3
		}

		this.add.image(10, 10, TOP_LEFT).setOrigin(0, 0)
		this.add.image(10, sceneHeight - 175, BOTTOM_LEFT).setOrigin(0, 0)
		this.add.image(sceneWidth - 175, 10, TOP_RIGHT).setOrigin(0, 0)
		this.add.image(sceneWidth - 175, sceneHeight - 175, BOTTOM_RIGHT).setOrigin(0, 0)
	}

	handleIadCharacterCollision(iad: Phaser.Types.Physics.Arcade.GameObjectWithBody, character: Character) {
		this.sound.play(IAD_AUDIO)
		character.updateScore(-100)
		iad.destroy()
		character.body.velocity.x = 25
		character.body.velocity.y = 0
	}

	onGameEnd(airconsole: AirConsole) {
		const sortedCharactersByScore: Character[] = this.playerCharacters
			.sort((a, b) => a.getScore() - b.getScore())
			.reverse()
		this.drawScoreBoard(sortedCharactersByScore)
		airconsole.message(airconsole.getMasterControllerDeviceId(), { joinedState: 'success', gameState: 'lobby' })
	}

	upscaleCharacter(character: Phaser.GameObjects.Sprite) {
		if (character.scale < 1.5) {
			character.setScale(character.scale + 0.1)
		}
	}

	downscaleCharacter(character: Phaser.GameObjects.Sprite) {
		character.setScale(character.scale - 0.1)
	}

	handleDonutCharacterCollisions(donut: Phaser.Types.Physics.Arcade.GameObjectWithBody, character: Character) {
		this.sound.play(DONUT_AUDIO)

		donut.destroy()
		this.upscaleCharacter(character as Phaser.GameObjects.Sprite)

		this.time.addEvent({
			delay: 5000,
			callback: () => this.downscaleCharacter(character as Phaser.GameObjects.Sprite),
			loop: false,
		})
		character.updateScore(DONUT_POINTS)
	}

	handleSchokibonCharacterCollisions(schokibon: Phaser.Types.Physics.Arcade.GameObjectWithBody, character: Character) {
		this.sound.play(SCHOKIBON_AUDIO)

		schokibon.destroy()
		character.updateScore(DONUT_POINTS)
	}

	handleHorseCharacterOverlap(
		horse: Phaser.Types.Physics.Arcade.GameObjectWithBody,
		character: Phaser.Types.Physics.Arcade.GameObjectWithBody
	) {
		horse.destroy()
		character.body.velocity.x += 1000
	}

	spawnIad() {
		const spawnXpadding = 50
		const randomXPos = Phaser.Math.Between(spawnXpadding, this.game.canvas.width - spawnXpadding)

		const iad = this.physics.add.sprite(randomXPos, 250, IAD_ITEM_IMAGE).setScale(0.5)
		iad.setCollideWorldBounds(true)

		this.iads?.add(iad)
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

	updateCountdown() {
		let countdownSeconds: number = 0

		if (this.countdown == null) {
			const sceneWidth = this.game.canvas.width
			const posX = sceneWidth / 2

			this.countdown = this.add
				.text(posX - 50, 50, 'Countdown', {
					fontFamily: 'Luckiest Guy',
					fontSize: '48px',
					color: '#ff0000',
					align: 'middle',
				})
				.setName(COUNTDOWN)
				.setResolution(3)

			countdownSeconds = 180
		} else {
			countdownSeconds = this.countdown.getData('seconds')
		}

		if (countdownSeconds > 0) {
			countdownSeconds--
		}

		this.countdown.setData('seconds', countdownSeconds)
		this.countdown.setText('⏱ ' + countdownSeconds)
	}

	drawScores() {
		const padding = 90

		const [topLeftX, topLeftY] = [padding, padding]
		const [topRightX, topRightY] = [this.game.canvas.width - padding, padding]
		const [bottomLeftX, bottomLeftY] = [padding, this.game.canvas.height - padding]
		const [bottomRightX, bottomRightY] = [this.game.canvas.width - padding, this.game.canvas.height - padding]

		this.add
			.text(topLeftX, topLeftY, `${FLAMINGO.name}: 0`, {
				fontFamily: 'Luckiest Guy',
				fontSize: '42px',
				color: FLAMINGO.color,
			})
			.setName(FLAMINGO.scoreKey)
			.setData('score', 0)
			.setResolution(3)
			.setOrigin(0, 0)

		this.add
			.text(topRightX, topRightY, `${DUCK.name}: 0`, {
				fontFamily: 'Luckiest Guy',
				fontSize: '42px',
				color: DUCK.color,
			})
			.setName(DUCK.scoreKey)
			.setData('score', 0)
			.setResolution(3)
			.setOrigin(1, 0)

		this.add
			.text(bottomLeftX, bottomLeftY, `${TOUCAN.name}: 0`, {
				fontFamily: 'Luckiest Guy',
				fontSize: '42px',
				color: TOUCAN.color,
			})
			.setName(TOUCAN.scoreKey)
			.setData('score', 0)
			.setResolution(3)
			.setOrigin(0, 1)

		this.add
			.text(bottomRightX, bottomRightY, `${UNICORN.name}: 0`, {
				fontFamily: 'Luckiest Guy',
				fontSize: '42px',
				color: UNICORN.color,
			})
			.setName(UNICORN.scoreKey)
			.setData('score', 0)
			.setResolution(3)
			.setOrigin(1, 1)
	}

	drawScoreBoard(characters: Character[]) {
		const horizontalCenter = this.game.canvas.width / 2
		const verticalPaddingInBetween = 100

		let yPosition = 150

		// TITLE
		this.add
			.text(horizontalCenter, yPosition, `HIGHSCORES`, {
				fontFamily: 'Luckiest Guy',
				fontSize: '65px',
				color: '#FFFFFF',
				align: 'center',
			})
			.setOrigin(0.5, 0)
		yPosition += verticalPaddingInBetween

		// SCOREBOARD ENTRIES
		for (const character of characters) {
			this.add
				.text(horizontalCenter, yPosition, `${character.name}: ${character.getScore()}`, {
					fontFamily: 'Luckiest Guy',
					fontSize: '48px',
					color: character.props.color,
					align: 'center',
				})
				.setOrigin(0.5, 0)
			yPosition += verticalPaddingInBetween
		}
	}

	setStartCharacterPosition() {
		const sceneWidth = this.game.canvas.width
		const sceneHorizontalCenter = sceneWidth / 2
		const startLanesY = this.game.canvas.height * 0.8

		const flamingo = this.children.getByName(FLAMINGO.name) as Phaser.GameObjects.Sprite
		flamingo.setPosition(sceneHorizontalCenter - 300, startLanesY).setScale(0.5)
		const unicorn = this.children.getByName(UNICORN.name) as Phaser.GameObjects.Sprite
		unicorn.setPosition(sceneHorizontalCenter - 100, startLanesY).setScale(0.5)
		const duck = this.children.getByName(DUCK.name) as Phaser.GameObjects.Sprite
		duck.setPosition(sceneHorizontalCenter + 100, startLanesY).setScale(0.5)
		const toucan = this.children.getByName(TOUCAN.name) as Phaser.GameObjects.Sprite
		toucan.setPosition(sceneHorizontalCenter + 300, startLanesY).setScale(0.5)
	}

	spawnHorses() {
		const spawnXpadding = 100
		const randomYPos = Phaser.Math.Between(spawnXpadding, this.game.canvas.height - spawnXpadding * 5)

		const horse = this.physics.add.sprite(spawnXpadding, randomYPos, HORSE_ITEM_IMAGE).setScale(0.07)

		horse.setCollideWorldBounds(true)
		horse.body.onWorldBounds = true
		horse.setVelocityX(200)
		horse.setVelocityY(-205)
		this.horses?.add(horse)
	}

	start(airconsole: AirConsole) {
		this.setStartCharacterPosition()
		this.drawScores()

		this.time.addEvent({
			delay: 180000, // 3 min
			callback: () => this.onGameEnd(airconsole),
		})

		this.time.addEvent({
			delay: 3500,
			callback: () => this.spawnDonut(),
			loop: true,
		})

		this.time.addEvent({
			delay: 15000,
			callback: () => this.spawnIad(),
			loop: true,
		})

		this.time.addEvent({
			delay: 2000,
			callback: () => this.spawnSchokibon(),
			loop: true,
		})

		this.time.addEvent({
			delay: 20000,
			callback: () => this.spawnHorses(),
			loop: true,
		})

		this.time.addEvent({
			delay: 1000,
			callback: () => this.updateCountdown(),
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
		airconsole.message(airconsole.getMasterControllerDeviceId(), { joinedState: 'success', gameState: 'game' })
	}
}
