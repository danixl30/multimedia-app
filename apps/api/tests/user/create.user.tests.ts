import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { BadException } from '../../src/core/application/exceptions/bad.exception'
import { Roles } from '../../src/user/application/models/user'
import { createUserService } from '../../src/user/application/services/create/create.user.service'
import { cryptoMock } from './mocks/crypto.mock'
import { idMockGenerator } from './mocks/id.generator'
import { userRepositoryMock } from './mocks/user.repository.mock'

describe('Create user', () => {
	it('Should create user with basic data', async () => {
		const userRepository = userRepositoryMock()
		const userId = 'c0b1cbab-6073-45c7-8d66-48ea717fd123'
		const data = {
			email: 'test@mail.com',
			username: 'test',
			type: 'ADMIN' as Roles,
			password: 'password',
		}
		const resp = await createUserService(
			idMockGenerator(userId),
			cryptoMock(),
			userRepository,
		)(data)
		assert.equal(resp.id, userId)
		assert.deepEqual(await userRepository.findById(userId), {
			...data,
			id: userId,
		})
	})

	it('Should not create user with repated email', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test@mail.com',
				password: 'test',
				type: 'ADMIN',
				username: 'test2',
			},
		])
		const userId = 'c0b1cbab-6073-45c7-8d66-48ea717fd123'
		const data = {
			email: 'test@mail.com',
			username: 'test',
			type: 'ADMIN' as Roles,
			password: 'password',
		}
		await createUserService(
			idMockGenerator(userId),
			cryptoMock(),
			userRepository,
		)(data).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
	it('Should not create user with repated username', async () => {
		const userRepository = userRepositoryMock([
			{
				id: '2e0b97b2-8f57-4e00-90e2-224a334d3c1b',
				email: 'test2@mail.com',
				password: 'test',
				type: 'ADMIN',
				username: 'test2',
			},
		])
		const userId = 'c0b1cbab-6073-45c7-8d66-48ea717fd123'
		const data = {
			email: 'test@mail.com',
			username: 'test',
			type: 'ADMIN' as Roles,
			password: 'password',
		}
		await createUserService(
			idMockGenerator(userId),
			cryptoMock(),
			userRepository,
		)(data).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
})
