import { Router } from 'express'
import { validateBody } from '../../core/infrastructure/zod.body.validador'
import { authMiddleware } from '../../user/infrastructure/middlewares/auth.user'
import { rolesMiddleware } from '../../user/infrastructure/middlewares/roles.user'
import { countCategoryContentsController } from './controllers/countContent/count.content.controller'
import { createCategoryController } from './controllers/create/create.controller'
import { createCategorySchema } from './controllers/create/dto'
import { getAllCategoriesByIdController } from './controllers/getAll/get.all.controller'
import { getCategoryByIdController } from './controllers/getById/get.by.id.controller'

export const categoryRouter = Router()

categoryRouter.post(
	'/',
	authMiddleware,
	rolesMiddleware('ADMIN'),
	validateBody(createCategorySchema),
	createCategoryController,
)
categoryRouter.get('/many', authMiddleware, getAllCategoriesByIdController)
categoryRouter.get('/count/contents', countCategoryContentsController)
categoryRouter.get('/:id', authMiddleware, getCategoryByIdController)
