import { Request, Response } from 'express'

export const currentUserController = (req: Request, res: Response) => {
	res.json(req.user)
}
