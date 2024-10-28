import expressAsyncHandler from 'express-async-handler'
import { Content } from '../../models/content.model'

export const getContentsController = expressAsyncHandler(async (req, res) => {
	const { page, perPage, title, theme } = req.query
	const query: Record<string, any> = {}
	if (title)
		query['$text'] = {
			$search: (title as string) ?? '',
		}
	if (theme) query['theme'] = theme
	const contents = await Content.find(query)
		.skip(page && perPage ? (Number(page) - 1) * Number(perPage) : 0)
		.limit(perPage ? Number(perPage) : 0)
		.populate('createdBy')
		.sort('-creationDate')
	res.json(
		contents
			.map((e) => e.toObject())
			.map(({ _id, ...rest }) => ({
				id: _id,
				...rest,
				createdBy: {
					id: rest.createdBy!._id,
					username: (rest as any).createdBy.username,
				},
			})),
	)
})
