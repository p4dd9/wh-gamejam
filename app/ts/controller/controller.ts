/**
 * This CSS import ensures <style> tags are added
 * to the <head> of the document.
 */
import '../../css/controller.css'

const airconsole = new AirConsole()
const body = document.body

/**
 * SAMPLE: send message to SCREEN
 */
let leftButton = <HTMLElement>document.body.querySelector(".left")
leftButton.addEventListener("click", () => {
	moveLeft()
})

let rightButton = <HTMLElement>document.body.querySelector(".right")
rightButton.addEventListener("click", () => {
	moveRight()
})

/**
* Tells the screen to move the player to the left.
*/
function moveLeft() {
	airconsole.message(AirConsole.SCREEN, {MOVE: 'left'})
}

/**
 * Tells the screen to move the player to the right.
 */
function moveRight() {
	airconsole.message(AirConsole.SCREEN, {MOVE: 'right'})
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
