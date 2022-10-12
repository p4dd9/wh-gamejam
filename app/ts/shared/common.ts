export interface PlayerInputs {
	MOVE: 'left' | 'right'
	START?: boolean
}

export type Character = 'toucan' | 'flamingo' | 'unicorn' | 'duck'
export interface LobbyAction {
	joinedState: 'success' | 'full'
	character?: Character
}
