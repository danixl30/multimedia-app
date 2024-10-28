import expressAsyncHandler from 'express-async-handler'
import { createCategory } from '../../../../category/application/services/create/create.service'
import { mongoIdGenerator } from '../../../../core/infrastructure/id.mongo.generator'
import { categoryMongoRepository } from '../../repositories/category.repository'

export const createCategoryController = expressAsyncHandler(
	async (req, res) => {
		const resp = await createCategory(
			mongoIdGenerator,
			categoryMongoRepository(),
		)(req.body)
		res.status(201).json(resp)
	},
)
