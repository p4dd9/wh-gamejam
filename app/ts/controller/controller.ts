/**
 * This CSS import ensures <style> tags are added
 * to the <head> of the document.
 */
import '../../css/controller.css'

const airconsole = new AirConsole()

/**
 * SAMPLE: send message to SCREEN
 */
const body = document.body
body.addEventListener('click', () => {
	airconsole.message(AirConsole.SCREEN, 'Bonk')
})
