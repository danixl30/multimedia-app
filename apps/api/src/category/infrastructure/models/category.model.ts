import { Schema, model } from 'mongoose'

export const categorySchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	image: {
		type: String,
	},
})

export const Category = model('Category', categorySchema)
