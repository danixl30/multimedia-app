import { User } from 'src/user/application/models/user'
import { UserRepository } from 'src/user/application/respositories/user.repository'

export const userRepositoryMock = (users: User[] = []): UserRepository => ({
	async save(user) {
		users.push(user)
	},
	async findByEmail(email) {
		return users.find((e) => e.email === email)
	},
	async findByUsername(username) {
		return users.find((e) => e.username === username)
	},
	async findById(id) {
		return users.find((e) => e.id === id)
	},
	async delete(_user) {},
})
