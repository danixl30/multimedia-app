import { Router } from 'express'
import { validateBody } from '../../core/infrastructure/zod.body.validador'
import { authMiddleware } from '../../user/infrastructure/middlewares/auth.user'
import { rolesMiddleware } from '../../user/infrastructure/middlewares/roles.user'
import { calculatePaginationContentsController } from './controllers/calculatePagination/calculate.pagination.controller'
import { createContentController } from './controllers/create/create.controller'
import { createContentSchema } from './controllers/create/dto'
import { getContentsController } from './controllers/getAll/get.all.controller'
import { getContentByIdController } from './controllers/getById/get.by.id.controller'

export const contentRouter = Router()

contentRouter.post(
	'/',
	authMiddleware,
	rolesMiddleware('CREATOR'),
	validateBody(createContentSchema),
	createContentController,
)
contentRouter.get('/many', getContentsController)
contentRouter.get(
	'/calculate/pagination',
	calculatePaginationContentsController,
)
contentRouter.get('/:id', authMiddleware, getContentByIdController)
