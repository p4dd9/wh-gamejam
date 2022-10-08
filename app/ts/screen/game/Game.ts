import { gameConfig, SCENES } from './config'

export class PhaserGame extends Phaser.Game {
	constructor(airconsole: AirConsole) {
		super({ ...gameConfig })
		this.scene.start(SCENES.GAME, airconsole)
	}
}
