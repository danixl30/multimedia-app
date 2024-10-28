import assert from 'node:assert'
import { describe, it } from 'node:test'
import { BadException } from '../../src/core/application/exceptions/bad.exception'
import { NotFoundException } from '../../src/core/application/exceptions/not.found.exception'
import { createTheme } from '../../src/theme/application/services/create/create.theme'
import { categoryRepositoryMock } from './mocks/category.repository'
import { idMockGenerator } from './mocks/id.generator'
import { themeRepositoryMock } from './mocks/theme.repository'

describe('Create theme', () => {
	it('Should create theme with correct data', async () => {
		const categoryId = 'e715195a-897a-4b34-be64-10c247c36e1e'
		const categoryRepository = categoryRepositoryMock([
			{
				id: categoryId,
				name: 'category',
				image: 'image',
			},
		])
		const themeRepository = themeRepositoryMock()
		const id = '531d189a-15ed-49f2-beff-e9e5b30102bd'
		const resp = await createTheme(
			idMockGenerator(id),
			themeRepository,
			categoryRepository,
		)({
			name: 'theme',
			categories: [categoryId],
		})
		assert.strict.deepEqual(resp, {
			id,
		})
		assert.strict.deepEqual(await themeRepository.findById(id), {
			id,
			name: 'theme',
			categories: [categoryId],
		})
	})

	it('Should not create theme without correct category', async () => {
		const categoryId = 'e715195a-897a-4b34-be64-10c247c36e1e'
		const categoryRepository = categoryRepositoryMock()
		const themeRepository = themeRepositoryMock()
		const id = '531d189a-15ed-49f2-beff-e9e5b30102bd'
		await createTheme(
			idMockGenerator(id),
			themeRepository,
			categoryRepository,
		)({
			name: 'theme',
			categories: [categoryId],
		}).catch((error) => {
			if (!(error instanceof NotFoundException))
				assert.fail('Expected bad exception')
		})
	})

	it('Should not create theme with repeated name', async () => {
		const categoryId = 'e715195a-897a-4b34-be64-10c247c36e1e'
		const categoryRepository = categoryRepositoryMock([
			{
				id: categoryId,
				name: 'category',
				image: 'image',
			},
		])
		const themeRepository = themeRepositoryMock([
			{
				id: '9b913d00-101b-4abe-a692-16c3e612b2c4',
				name: 'theme',
				categories: [],
			},
		])
		const id = '531d189a-15ed-49f2-beff-e9e5b30102bd'
		await createTheme(
			idMockGenerator(id),
			themeRepository,
			categoryRepository,
		)({
			name: 'theme',
			categories: [categoryId],
		}).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
})
