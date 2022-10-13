/**
 * This CSS import ensures <style> tags are added
 * to the <head> of the document.
 */
import '../../css/controller.css'
import {GameUpdates} from '../shared/common'
import {MAX_PLAYER} from "../screen/consts";

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

let startButton = <HTMLElement>document.body.querySelector('#start')
startButton.addEventListener('click', () => {
	if (airconsole.getControllerDeviceIds().length != MAX_PLAYER) {
		alert("You need 4 players to start the game")
	} else {
		startGame()
	}
})

/**
 * Tells the screen to move the player to the left.
 */
function moveLeft() {
	airconsole.message(AirConsole.SCREEN, {MOVE: 'left', START: false})
}

/**
 * Tells the screen to move the player to the right.
 */
function moveRight() {
	airconsole.message(AirConsole.SCREEN, {MOVE: 'right', START: false})
}

/**
 * Tells the game to start.
 */
function startGame() {
	airconsole.message(AirConsole.SCREEN, {MOVE: 'none', START: true})
}

airconsole.onMessage = (from, data: GameUpdates) => {
	if (data.joinedState) {
		if (data.joinedState) {
			if (data.gameState) {
				let startButton = <HTMLElement>document.body.querySelector("#start")
				switch (data.gameState) {
					case "game": {
						showElementOn(false, startButton)
						break;
					}
					default:
					case "lobby": {
						alert(airconsole.getMasterControllerDeviceId())
						showElementOn(airconsole.getDeviceId() == airconsole.getMasterControllerDeviceId(), startButton)
					}
				}
			}
		}
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
	showElementOn(airconsole.getDeviceId() == airconsole.getMasterControllerDeviceId(), startButton)
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
