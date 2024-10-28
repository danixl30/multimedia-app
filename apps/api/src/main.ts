import cors from 'cors'
import express from 'express'
import './core/infrastructure/database/mongoose.connection'
import { exceptionHandler } from './core/infrastructure/middlewares/exception.handler'
import { appRouter } from './router'
import { User } from './user/application/models/user'

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	namespace Express {
		interface Request {
			user: User
		}
	}
}

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', appRouter)
app.use(exceptionHandler)

const port = process.env.PORT || 4000
app.listen(port, () => console.log('server on PORT: ', port))
