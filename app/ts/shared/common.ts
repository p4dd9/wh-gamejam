export interface PlayerInputs {
	MOVE: 'left' | 'right' | 'none'
	START?: boolean
}

export interface CharacterProps {
	name: CharacterName
	scoreKey: string
	texture: string
	color: string
}

export type CharacterName = 'toucan' | 'flamingo' | 'unicorn' | 'duck'
export interface GameUpdates {
	joinedState: 'success' | 'full' | 'disconnected'
	character?: CharacterName
	gameState?: 'lobby' | 'game'
}

export interface Score {
	character: string
	score: number
	color: string
}
