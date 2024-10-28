import expressAsyncHandler from 'express-async-handler'
import { Content } from '../../../../content/infrastructure/models/content.model'
import { Theme } from '../../models/theme.model'

export const countThemeContentsController = expressAsyncHandler(
	async (_req, res) => {
		const themes = await Theme.find()
		const data = await Promise.all(
			themes.map(async (theme) => {
				const numOfContent = await Content.countDocuments({
					theme: theme._id,
				})
				return {
					id: theme.id,
					name: theme.name,
					count: numOfContent,
				}
			}),
		)
		res.json(data)
	},
)
