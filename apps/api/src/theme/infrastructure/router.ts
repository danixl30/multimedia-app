import { Router } from 'express'
import { validateBody } from '../../core/infrastructure/zod.body.validador'
import { authMiddleware } from '../../user/infrastructure/middlewares/auth.user'
import { rolesMiddleware } from '../../user/infrastructure/middlewares/roles.user'
import { countThemeContentsController } from './controllers/countContent/count.content.controller'
import { createThemeController } from './controllers/create/create.controller'
import { createThemeSchema } from './controllers/create/dto'
import { getAllThemesController } from './controllers/getAll/get.all.controller'
import { getThemeByIdController } from './controllers/getById/get.by.id.controller'

export const themeRouter = Router()

themeRouter.post(
	'/',
	authMiddleware,
	rolesMiddleware('ADMIN'),
	validateBody(createThemeSchema),
	createThemeController,
)
themeRouter.get('/many', authMiddleware, getAllThemesController)
themeRouter.get('/count/contents', countThemeContentsController)
themeRouter.get('/:id', authMiddleware, getThemeByIdController)
