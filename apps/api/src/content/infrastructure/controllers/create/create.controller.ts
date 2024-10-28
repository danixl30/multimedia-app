import expressAsyncHandler from 'express-async-handler'
import { createContent } from '../../../../content/application/services/create/create.content'
import { dateGenerator } from '../../../../core/infrastructure/date.generator'
import { mongoIdGenerator } from '../../../../core/infrastructure/id.mongo.generator'
import { themeMongoRepository } from '../../../../theme/infrastructure/repositories/theme.repository'
import { contentMongoRepository } from '../../repositories/content.repositry'

export const createContentController = expressAsyncHandler(async (req, res) => {
	const resp = await createContent(
		mongoIdGenerator,
		contentMongoRepository(),
		dateGenerator,
		themeMongoRepository(),
	)({
		...req.body,
		createdBy: {
			id: req.user.id,
			username: req.user.username,
		},
	})
	res.status(201).json(resp)
})
