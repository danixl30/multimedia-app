import assert from 'node:assert'
import { describe, it } from 'node:test'
import { createCategory } from '../../src/category/application/services/create/create.service'
import { BadException } from '../../src/core/application/exceptions/bad.exception'
import { categoryRepositoryMock } from './mocks/category.repository'
import { idMockGenerator } from './mocks/id.generator'

describe('Create category', () => {
	it('Should create category with correct data', async () => {
		const categoryRepository = categoryRepositoryMock()
		const id = '2e0b97b2-8f57-4e00-90e2-224a334d3c1b'
		const resp = await createCategory(
			idMockGenerator(id),
			categoryRepository,
		)({
			name: 'test',
			image: 'image',
		})
		assert.strict.deepEqual(resp, {
			id,
		})
		assert.strict.deepEqual(await categoryRepository.findById(id), {
			id,
			name: 'test',
			image: 'image',
		})
	})
	it('Should not create category with repeated name', async () => {
		const categoryRepository = categoryRepositoryMock([
			{
				id: 'e715195a-897a-4b34-be64-10c247c36e1e',
				name: 'test',
				image: 'image',
			},
		])
		const id = '2e0b97b2-8f57-4e00-90e2-224a334d3c1b'
		await createCategory(
			idMockGenerator(id),
			categoryRepository,
		)({
			name: 'test',
			image: 'image',
		}).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
})
