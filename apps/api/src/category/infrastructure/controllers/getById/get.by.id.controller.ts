import expressAsyncHandler from 'express-async-handler'
import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import { Category } from '../../models/category.model'

export const getCategoryByIdController = expressAsyncHandler(
	async (req, res) => {
		const category = await Category.findById(req.params.id)
		if (!category) throw new NotFoundException('Rategory not found')
		const { _id, ...rest } = category.toObject()
		console.log(rest)
		res.json({
			id: _id,
			...rest,
		})
	},
)
