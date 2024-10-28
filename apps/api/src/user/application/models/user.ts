export type User = {
	id: string
	username: string
	email: string
	password: string
	type: Roles
}

export const roles = ['ADMIN', 'CREATOR', 'READER'] as const
export type Roles = (typeof roles)[number]
