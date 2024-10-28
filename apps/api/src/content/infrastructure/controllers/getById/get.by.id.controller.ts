import expressAsyncHandler from 'express-async-handler'
import { Category } from '../../../../category/infrastructure/models/category.model'
import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import { Content } from '../../models/content.model'

export const getContentByIdController = expressAsyncHandler(
	async (req, res) => {
		const content = await Content.findById(req.params.id)
			.populate({
				path: 'theme',
				select: 'name _id',
			})
			.populate('createdBy')
		if (!content) throw new NotFoundException('Content not found')
		const { _id, ...rest } = content.toObject()
		res.json({
			id: _id,
			...rest,
			medias: await Promise.all(
				rest.medias.map(async (e) => {
					const category = await Category.findById(e.category)
					return {
						...e,
						name: category!.name!,
					}
				}),
			),
			theme: {
				id: rest.theme!._id,
				name: (rest as any).theme.name,
			},
			createdBy: {
				id: rest.createdBy!._id,
				username: (rest as any).createdBy.username,
			},
		})
	},
)
