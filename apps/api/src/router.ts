import { Router } from 'express'
import { categoryRouter } from './category/infrastructure/router'
import { contentRouter } from './content/infrastructure/router'
import { themeRouter } from './theme/infrastructure/router'
import { userRouter } from './user/infrastructure/router'

export const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/theme', themeRouter)
appRouter.use('/content', contentRouter)
appRouter.use('/category', categoryRouter)
