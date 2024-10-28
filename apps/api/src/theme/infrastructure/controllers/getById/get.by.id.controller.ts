import expressAsyncHandler from 'express-async-handler'
import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import { Theme } from '../../models/theme.model'

export const getThemeByIdController = expressAsyncHandler(async (req, res) => {
	const theme = await Theme.findById(req.params.id).populate({
		path: 'categories',
		select: 'name _id',
	})
	if (!theme) throw new NotFoundException('Theme not found')
	const { _id, ...rest } = theme.toObject()
	res.json({
		id: _id,
		...rest,
		categories: rest.categories.map((e: any) => ({
			id: e._id,
			name: e.name,
		})),
	})
})
