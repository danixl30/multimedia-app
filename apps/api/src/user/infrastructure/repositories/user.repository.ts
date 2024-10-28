import { Types } from 'mongoose'
import type { UserRepository } from 'src/user/application/respositories/user.repository'
import { User } from '../models/user.model'

export const userMongoRepository = (): UserRepository => ({
	async save(user) {
		await User.findOneAndUpdate(
			{
				_id: user.id,
			},
			{
				_id: new Types.ObjectId(user.id),
				username: user.username,
				password: user.password,
				email: user.email,
				type: user.type,
			},
			{
				upsert: true,
			},
		)
	},
	async findById(id) {
		const user = await User.findById(id)
		if (!user) return null
		return {
			id,
			username: user.username!,
			password: user.password!,
			email: user.email!,
			type: user.type!,
		}
	},
	async findByEmail(email) {
		const user = await User.findOne({
			email,
		})
		if (!user) return null
		return {
			id: String(user.id),
			username: user.username!,
			password: user.password!,
			email: user.email!,
			type: user.type!,
		}
	},
	async findByUsername(username) {
		const user = await User.findOne({
			username,
		})
		if (!user) return null
		return {
			id: String(user.id),
			username: user.username!,
			password: user.password!,
			email: user.email!,
			type: user.type!,
		}
	},
	async delete(user) {
		await User.findByIdAndDelete(user.id)
	},
})
