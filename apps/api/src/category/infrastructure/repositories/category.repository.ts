import { Types } from 'mongoose'
import type { CategoryRepository } from 'src/category/application/repositories/category.repository'
import { Category } from '../models/category.model'

export const categoryMongoRepository = (): CategoryRepository => ({
	async save(category) {
		await Category.findOneAndUpdate(
			{
				_id: category.id,
			},
			{
				_id: new Types.ObjectId(category.id),
				name: category.name,
				image: category.image,
			},
			{
				upsert: true,
			},
		)
	},
	async findById(id) {
		const category = await Category.findById(id)
		if (!category) return null
		return {
			id,
			name: category.name!,
			image: category.image!,
		}
	},
	async findByName(name) {
		const category = await Category.findOne({
			name,
		})
		if (!category) return null
		return {
			id: category.id!,
			name: category.name!,
			image: category.image!,
		}
	},
})
