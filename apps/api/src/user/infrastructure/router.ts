import { Router } from 'express'
import { validateBody } from '../../core/infrastructure/zod.body.validador'
import { createUserController } from './controllers/create/create.controller'
import { createUserSchema } from './controllers/create/dto'
import { currentUserController } from './controllers/current/current.controller'
import { loginUserSchema } from './controllers/login/dto'
import { loginUserController } from './controllers/login/login.controller'
import { authMiddleware } from './middlewares/auth.user'

export const userRouter = Router()

userRouter.post('/', validateBody(createUserSchema), createUserController)
userRouter.post('/login', validateBody(loginUserSchema), loginUserController)
userRouter.get('/current', authMiddleware, currentUserController)
