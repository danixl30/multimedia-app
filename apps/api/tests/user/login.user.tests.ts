import assert from 'node:assert'
import { describe, it } from 'node:test'
import { BadException } from '../../src/core/application/exceptions/bad.exception'
import { loginUserService } from '../../src/user/application/services/login/login.user.service'
import { cryptoMock } from './mocks/crypto.mock'
import { tokenServiceMock } from './mocks/token.mock'
import { userRepositoryMock } from './mocks/user.repository.mock'

describe('Login user', () => {
	it('Should login user with correct credentials', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				type: 'ADMIN',
				username: 'test2',
			},
		])
		const resp = await loginUserService(
			userRepository,
			cryptoMock(),
			tokenServiceMock(),
		)({
			email: 'test@mail.com',
			password: 'test',
		})
		assert.strict.equal(
			resp,
			JSON.stringify({
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
			}),
		)
	})
	it('Should not login user with incorrect email', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				type: 'ADMIN',
				username: 'test2',
			},
		])
		await loginUserService(
			userRepository,
			cryptoMock(),
			tokenServiceMock(),
		)({
			email: 'test2@mail.com',
			password: 'test',
		}).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
	it('Should not login user with incorrect password', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				type: 'ADMIN',
				username: 'test2',
			},
		])
		await loginUserService(
			userRepository,
			cryptoMock(),
			tokenServiceMock(),
		)({
			email: 'test@mail.com',
			password: 'test2',
		}).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
})
