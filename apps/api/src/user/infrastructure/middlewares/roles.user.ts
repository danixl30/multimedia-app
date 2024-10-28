import { NextFunction, Request, Response } from 'express'
import { Roles } from '../../application/models/user'

export const rolesMiddleware =
	(...roles: Roles[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		if (!req.user || !roles.includes(req.user.type)) {
			res.status(403).json({
				msg: 'User unathorized',
			})
			return
		}
		next()
	}
