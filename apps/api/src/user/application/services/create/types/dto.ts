import { Roles } from 'src/user/application/models/user'

export type CreateUserDTO = {
	username: string
	email: string
	password: string
	type: Roles
}
