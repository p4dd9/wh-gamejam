export interface PlayerInputs {
	MOVE: 'left' | 'right' | 'none'
	START?: boolean
}

export type Character = 'toucan' | 'flamingo' | 'unicorn' | 'duck'
export interface GameUpdates {
	joinedState: 'success' | 'full' | 'disconnected'
	character?: Character
	gameState?: 'lobby' | 'game'
}
