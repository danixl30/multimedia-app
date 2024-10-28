import { ErrorRequestHandler } from 'express'
import { BaseException } from '../../application/base.exception'

export const exceptionHandler: ErrorRequestHandler = (
	err,
	_req,
	res,
	_next,
) => {
	if (err instanceof BaseException) {
		res.status(err.code).json({
			msg: err.message,
		})
		return
	}
	console.log(err)
	res.status(500).json({
		msg: 'Internal error',
	})
}
