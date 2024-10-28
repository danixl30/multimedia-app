import { BaseException } from '../base.exception'

export class BadException extends BaseException {
	constructor(message: string) {
		super(message, 400)
	}
}
