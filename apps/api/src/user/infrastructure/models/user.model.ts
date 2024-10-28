import { Schema, model } from 'mongoose'
import { roles } from '../../application/models/user'

export const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		null: false,
	},
	email: {
		type: String,
		unique: true,
		null: false,
	},
	password: {
		type: String,
		null: false,
	},
	type: {
		type: String,
		enum: roles,
		null: false,
	},
})

export const User = model('User', userSchema)
