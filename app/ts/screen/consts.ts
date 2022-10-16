import { CharacterName, CharacterProps } from '../shared/common'

/**
 * Assets keys
 */
export const HORSE_ITEM_IMAGE = 'horse'
export const IAD_ITEM_IMAGE = 'iad'
export const DONUT_ITEM_IMAGE = 'donut'
export const SCHOKIBON_ITEM_IMAGE = 'schokibon'

export const BACKGROUND_PATTERN_IMAGE = 'backgroundPattern'

/**
 * Background Music
 */
export const BACKGROUND_AUDIO = 'backgroundAudio'

/**
 * Sounds
 */
export const SCHOKIBON_AUDIO = 'schokibonAudio'
export const DONUT_AUDIO = 'donutAudio'
export const IAD_AUDIO = 'iadAudio'

/**
 * Character names
 */
export const FLAMINGO: CharacterProps = {
	name: 'flamingo',
	scoreKey: 'flamingScore',
	texture: 'flamingoCharacter',
	color: '#fa6493',
}

export const TOUCAN: CharacterProps = {
	name: 'toucan',
	scoreKey: 'toucanScore',
	texture: 'toucanCharacter',
	color: '#414545',
}

export const DUCK: CharacterProps = {
	name: 'duck',
	scoreKey: 'duckScore',
	texture: 'duckCharacter',
	color: '#f5e93c',
}

export const UNICORN: CharacterProps = {
	name: 'unicorn',
	scoreKey: 'unicornScore',
	texture: 'unicornCharacter',
	color: '#FFFFFF',
}

/**
 * Config
 */
export const MIN_PLAYERS = 2

/**
 * Background enrichment
 */

export const BOTTOM_RIGHT = 'bottom-right'
export const BOTTOM_LEFT = 'bottom-left'
export const TOP_RIGHT = 'top-right'
export const TOP_LEFT = 'top-left'

export const WHALE = 'whale'
export const TURTLE = 'turtle'
export const DOLPHINE = 'dolphine'
export const STONES = 'stones'

export const IMAGE_ARRAY: string[] = new Array(WHALE, TURTLE, DOLPHINE, STONES)
/**
 * POINTS
 */
export const SCHOKIBON_POINTS = 1000
export const DONUT_POINTS = 100

/**
 * Countdown
 */
export const COUNTDOWN = 'countdown'
