/**
 * This CSS import ensures <style> tags are added
 * to the <head> of the document.
 */
import '../../css/screen.css'
import { PhaserGame } from './game/Game'

const airconsole = new AirConsole()
const phaserGame = new PhaserGame(airconsole)
