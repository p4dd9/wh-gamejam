import { CharacterProps } from '../../../shared/common'

export class Character extends Phaser.Physics.Arcade.Sprite {
	public props: CharacterProps

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		characterProps: CharacterProps,
		frame?: string | number | undefined
	) {
		super(scene, x, y, characterProps.texture)
		this.props = characterProps

		this.setScale(0.5)
		this.setName(characterProps.name)
		this.setData('assigned', null)

		scene.add.existing(this)
		scene.physics.add.existing(this)

		this.setVelocity(0, 0)
		this.setAngularVelocity(this.getRandomAngularVelocity())
		this.setBounce(1, 1)
		this.setCollideWorldBounds(true)
		this.setVisible(false)
		this.setActive(false)
		this.disableBody(true)

		this.body.world.on(
			'worldbounds',
			(body: Phaser.Physics.Arcade.Body) => {
				if (body.gameObject === this) {
					this.setAngularVelocity(this.getRandomAngularVelocity())
					this.body.velocity.x -= 300
				}
			},
			this
		)
	}

	private getRandomAngularVelocity() {
		return [60, -60][Phaser.Math.Between(0, 1)]
	}

	public getScore() {
		return this.scene.children.getByName(this.props.scoreKey)?.getData('score') as number
	}

	public updateScore(points: number) {
		const text = this.scene.children.getByName(this.props.scoreKey) as Phaser.GameObjects.Text
		let newScore = text?.getData('score') + points
		if (newScore < 0) {
			newScore = 0
		}
		text.setData('score', text?.getData('score') + points)
		text.setText(`${this.name}: ${newScore}`)
	}
}
