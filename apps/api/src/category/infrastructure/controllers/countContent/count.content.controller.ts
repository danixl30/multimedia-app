import expressAsyncHandler from 'express-async-handler'
import { Content } from '../../../../content/infrastructure/models/content.model'
import { Category } from '../../models/category.model'

export const countCategoryContentsController = expressAsyncHandler(
	async (_req, res) => {
		const categories = await Category.find()
		const data = await Promise.all(
			categories.map(async (category) => {
				const numOfContent = await Content.countDocuments({
					'medias.category': category._id,
				})
				return {
					id: category.id,
					name: category.name,
					count: numOfContent,
				}
			}),
		)
		res.json(data)
	},
)
