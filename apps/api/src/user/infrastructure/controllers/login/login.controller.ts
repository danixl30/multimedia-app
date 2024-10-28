import expressAsyncHandler from 'express-async-handler'
import { TokenPayload } from 'src/user/application/models/token.payload'
import { argon2CryptoService } from '../../../../core/infrastructure/argon2.crypto.service'
import { jwtService } from '../../../../core/infrastructure/jwt.service'
import { loginUserService } from '../../../application/services/login/login.user.service'
import { userMongoRepository } from '../../repositories/user.repository'

export const loginUserController = expressAsyncHandler(async (req, res) => {
	const token = await loginUserService(
		userMongoRepository(),
		argon2CryptoService(),
		jwtService<TokenPayload>(),
	)(req.body)
	res.json({
		token,
	})
})
