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
