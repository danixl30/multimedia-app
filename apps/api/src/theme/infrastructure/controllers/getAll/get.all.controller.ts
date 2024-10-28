import expressAsyncHandler from 'express-async-handler'
import { Theme } from '../../models/theme.model'

export const getAllThemesController = expressAsyncHandler(async (_req, res) => {
	const themes = await Theme.find()
	res.json(
		themes
			.map((e) => e.toObject())
			.map(({ _id, ...rest }) => ({
				id: _id,
				...rest,
			})),
	)
})
