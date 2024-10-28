import jwt from 'jsonwebtoken'
import { TokenService } from '../application/token.service'

const secret = process.env.SECRET

export const jwtService = <T extends string | object>(): TokenService<T> => ({
	async sign(data) {
		return jwt.sign(data, secret!)
	},
	async verify(token) {
		return jwt.verify(token, secret!) as T
	},
})
