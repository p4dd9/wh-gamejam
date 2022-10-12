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

/*
* Checks if this device is part of the active game.
*/
airconsole.onActivePlayersChange = function (player) {
	var div = document.getElementById("player_id")

	if (div == null) {
		return
	}

	if (player !== undefined) {
		div.innerHTML =  (["Left Player", "Right Player"][player])
	} else {
		div.innerHTML = "It's a 2 player game!"
	}
}

/*
* Makes the device vibrate if the screen says so.
*/
airconsole.onMessage = function (from, data) {
	if (from == AirConsole.SCREEN && data.vibrate) {
		navigator.vibrate(data.vibrate)
		console.log("Vibrating: " + data.vibrate)
	}
}

/**
* Tells the screen to move the player to the left.
*/
function moveLeft() {
	airconsole.message(AirConsole.SCREEN, {move: 'left'})
}

/**
* Tells the screen to move the player to the right.
*/
function moveRight() {
	airconsole.message(AirConsole.SCREEN, {move: 'right'})
}
