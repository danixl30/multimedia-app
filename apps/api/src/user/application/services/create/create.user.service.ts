import { CryptoService } from 'src/core/application/crypto.service'
import { IDGenerator } from 'src/core/application/id.generator'
import { ApplicationService } from 'src/core/application/service'
import { BadException } from '../../../../core/application/exceptions/bad.exception'
import { UserRepository } from '../../respositories/user.repository'
import { CreateUserDTO } from './types/dto'
import { CreateUserResponse } from './types/response'

export const createUserService =
	(
		idGenerator: IDGenerator,
		crypto: CryptoService,
		userRepository: UserRepository,
	): ApplicationService<CreateUserDTO, CreateUserResponse> =>
	async (data) => {
		const [userByUsername, userByEmail] = await Promise.all([
			userRepository.findByEmail(data.email),
			userRepository.findByUsername(data.username),
		])
		if (userByUsername || userByEmail)
			throw new BadException('Unvalid data to create user')
		const userId = await idGenerator()
		await userRepository.save({
			...data,
			id: userId,
			password: await crypto.encrypt(data.password),
		})
		return {
			id: userId,
		}
	}
