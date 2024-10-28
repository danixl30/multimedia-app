import expressAsyncHandler from 'express-async-handler'
import { categoryMongoRepository } from '../../../../category/infrastructure/repositories/category.repository'
import { mongoIdGenerator } from '../../../../core/infrastructure/id.mongo.generator'
import { createTheme } from '../../../application/services/create/create.theme'
import { themeMongoRepository } from '../../repositories/theme.repository'

export const createThemeController = expressAsyncHandler(async (req, res) => {
	const resp = await createTheme(
		mongoIdGenerator,
		themeMongoRepository(),
		categoryMongoRepository(),
	)(req.body)
	res.status(201).json(resp)
})
