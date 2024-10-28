import { NextFunction, Request, Response } from 'express'
import { TokenPayload } from 'src/user/application/models/token.payload'
import { jwtService } from '../../../core/infrastructure/jwt.service'
import { getCurrentUserService } from '../../application/services/current/current.user.service'
import { userMongoRepository } from '../repositories/user.repository'

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = await jwtService<TokenPayload>().verify(
			req.headers.authorization?.replace('Bearer ', '') || '',
		)
		const user = await getCurrentUserService(userMongoRepository())(data)
		req.user = user
		next()
	} catch (_error) {
		res.status(403).json({
			msg: 'User unathorized',
		})
	}
}
