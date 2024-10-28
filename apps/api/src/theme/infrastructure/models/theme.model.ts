import { Schema, model } from 'mongoose'

export const themeSchema = new Schema({
	name: {
		type: String,
	},
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
	],
})

export const Theme = model('Theme', themeSchema)
