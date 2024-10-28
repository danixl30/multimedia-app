export abstract class BaseException extends Error {
	constructor(
		message: string,
		public readonly code: number,
	) {
		super(message)
	}
}
