import expressAsyncHandler from 'express-async-handler'
import { argon2CryptoService } from '../../../../core/infrastructure/argon2.crypto.service'
import { mongoIdGenerator } from '../../../../core/infrastructure/id.mongo.generator'
import { createUserService } from '../../../../user/application/services/create/create.user.service'
import { userMongoRepository } from '../../repositories/user.repository'

export const createUserController = expressAsyncHandler(async (req, res) => {
	const data = await createUserService(
		mongoIdGenerator,
		argon2CryptoService(),
		userMongoRepository(),
	)(req.body)
	res.status(201).json(data)
})
