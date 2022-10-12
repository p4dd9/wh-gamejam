/**
 * This CSS import ensures <style> tags are added
 * to the <head> of the document.
 */
import '../../css/controller.css'
import { LobbyAction } from '../shared/common'

const airconsole = new AirConsole()
airconsole.setOrientation(AirConsole.ORIENTATION_LANDSCAPE)
const body = document.body

/**
 * SAMPLE: send message to SCREEN
 */
let leftButton = <HTMLElement>document.body.querySelector('.left')
leftButton.addEventListener('click', () => {
	moveLeft()
})

let rightButton = <HTMLElement>document.body.querySelector('.right')
rightButton.addEventListener('click', () => {
	moveRight()
})

/**
 * Tells the screen to move the player to the left.
 */
function moveLeft() {
	airconsole.message(AirConsole.SCREEN, { MOVE: 'left' })
}

/**
 * Tells the screen to move the player to the right.
 */
function moveRight() {
	airconsole.message(AirConsole.SCREEN, { MOVE: 'right', START: true })
}

airconsole.onMessage = (from, data: LobbyAction) => {
	if (data.joinedState) {
		if (data.joinedState === 'success' && data.character) {
			switch (data.character.toLowerCase()) {
				case 'toucan': {
					document.body.style.backgroundColor = 'black'
					break
				}
				case 'duck': {
					document.body.style.backgroundColor = 'yellow'
					break
				}
				case 'flamingo': {
					document.body.style.backgroundColor = 'pink'
					break
				}
				case 'unicorn': {
					document.body.style.background =
						'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red)'
					break
				}
			}
		}
	}
}

airconsole.onConnect = function (device_id) {
	let startButton = <HTMLElement>document.body.querySelector("#start")
	showElementOn(device_id === airconsole.getMasterControllerDeviceId(), startButton)
}

airconsole.onMessage = function (from, data) {
	let actionButton = <HTMLElement>document.body.querySelector("#action")
	showElementOn(from == AirConsole.SCREEN && data.isDead, actionButton)
}

function showElementOn(condition: boolean, element: HTMLElement) {
	if (condition) {
		element.style.display = "block"
	} else {
		element.style.display = "none"
	}
}

airconsole.onConnect = function (device_id) {
	let startButton = <HTMLElement>document.body.querySelector("#start")
	showElementOn(device_id === airconsole.getMasterControllerDeviceId(), startButton)
}

airconsole.onMessage = function (from, data) {
	let actionButton = <HTMLElement>document.body.querySelector("#action")
	showElementOn(from == AirConsole.SCREEN && data.isDead, actionButton)
}

function showElementOn(condition: boolean, element: HTMLElement) {
	if (condition) {
		element.style.display = "block"
	} else {
		element.style.display = "none"
	}
}
