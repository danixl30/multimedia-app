import expressAsyncHandler from 'express-async-handler'
import { Content } from '../../models/content.model'

export const calculatePaginationContentsController = expressAsyncHandler(
	async (req, res) => {
		const { perPage, title, theme } = req.query
		const query: Record<string, any> = {}
		if (title)
			query['$text'] = {
				$search: (title as string) ?? '',
			}
		if (theme) query['theme'] = theme
		const count = await Content.countDocuments(query)
		res.json({
			perPage: Number(perPage),
			pages: Math.ceil(count / Number(perPage)),
		})
	},
)
