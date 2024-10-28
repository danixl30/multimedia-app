import { Schema, model } from 'mongoose'

const mediaSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	body: {
		type: String,
	},
})

export const contentSchema = new Schema({
	title: {
		type: String,
	},
	picture: {
		type: String,
	},
	theme: {
		type: Schema.Types.ObjectId,
		ref: 'Theme',
	},
	medias: [mediaSchema],
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	creationDate: {
		type: Date,
	},
})

contentSchema.index({ name: 'text', title: 'text' })

export const Content = model('Content', contentSchema)
