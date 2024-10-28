import { BaseException } from '../base.exception'

export class UnathorizedException extends BaseException {
	constructor(message: string) {
		super(message, 403)
	}
}
