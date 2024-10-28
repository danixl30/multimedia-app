import expressAsyncHandler from 'express-async-handler'
import { Category } from '../../models/category.model'

export const getAllCategoriesByIdController = expressAsyncHandler(
	async (_req, res) => {
		const categories = await Category.find()
		console.log(categories)
		res.json(
			categories
				.map((e) => e.toObject())
				.map(({ _id, ...rest }) => ({
					id: _id,
					...rest,
				})),
		)
	},
)
