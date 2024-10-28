import { TokenService } from 'src/core/application/token.service'
import { TokenPayload } from 'src/user/application/models/token.payload'

export const tokenServiceMock = (): TokenService<TokenPayload> => ({
	async sign(data) {
		return JSON.stringify(data)
	},
	async verify(token) {
		return JSON.parse(token)
	},
})
