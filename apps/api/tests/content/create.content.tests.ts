import assert from 'node:assert'
import { describe, it } from 'node:test'
import { createContent } from '../../src/content/application/services/create/create.content'
import { BadException } from '../../src/core/application/exceptions/bad.exception'
import { NotFoundException } from '../../src/core/application/exceptions/not.found.exception'
import { contentMockRepository } from './mocks/content.repository'
import { idMockGenerator } from './mocks/id.generator'
import { themeRepositoryMock } from './mocks/theme.repository'

describe('Create content', () => {
	it('Should create content with correct data', async () => {
		const categoryId = 'e715195a-897a-4b34-be64-10c247c36e1e'
		const themeId = '9b913d00-101b-4abe-a692-16c3e612b2c4'
		const themeRepository = themeRepositoryMock([
			{
				id: themeId,
				name: 'theme',
				categories: [categoryId],
			},
		])
		const contentRepository = contentMockRepository()
		const id = '531d189a-15ed-49f2-beff-e9e5b30102bd'
		const date = new Date()
		const data = {
			theme: themeId,
			title: 'content',
			picture: 'picture',
			createdBy: {
				id: '540ad184-605f-4ed4-9f76-61fe646492cc',
				username: 'creator',
			},
			medias: [
				{
					category: categoryId,
					body: 'body',
				},
			],
		}
		const resp = await createContent(
			idMockGenerator(id),
			contentRepository,
			async () => date,
			themeRepository,
		)(data)
		assert.strict.deepEqual(resp, {
			id,
		})
		assert.strict.deepEqual(await contentRepository.findById(id), {
			...data,
			id,
			creationDate: date,
		})
	})

	it('Should not create content without theme', async () => {
		const categoryId = 'e715195a-897a-4b34-be64-10c247c36e1e'
		const themeId = '9b913d00-101b-4abe-a692-16c3e612b2c4'
		const themeRepository = themeRepositoryMock([
			{
				id: themeId,
				name: 'theme',
				categories: [categoryId],
			},
		])
		const contentRepository = contentMockRepository()
		const id = '531d189a-15ed-49f2-beff-e9e5b30102bd'
		const date = new Date()
		const data = {
			theme: '',
			title: 'content',
			picture: 'picture',
			createdBy: {
				id: '540ad184-605f-4ed4-9f76-61fe646492cc',
				username: 'creator',
			},
			medias: [
				{
					category: categoryId,
					body: 'body',
				},
			],
		}
		await createContent(
			idMockGenerator(id),
			contentRepository,
			async () => date,
			themeRepository,
		)(data).catch((error) => {
			if (!(error instanceof NotFoundException))
				assert.fail('Expected bad exception')
		})
	})

	it('Should not create content without theme category', async () => {
		const categoryId = 'e715195a-897a-4b34-be64-10c247c36e1e'
		const themeId = '9b913d00-101b-4abe-a692-16c3e612b2c4'
		const themeRepository = themeRepositoryMock([
			{
				id: themeId,
				name: 'theme',
				categories: [categoryId],
			},
		])
		const contentRepository = contentMockRepository()
		const id = '531d189a-15ed-49f2-beff-e9e5b30102bd'
		const date = new Date()
		const data = {
			theme: themeId,
			title: 'content',
			picture: 'picture',
			createdBy: {
				id: '540ad184-605f-4ed4-9f76-61fe646492cc',
				username: 'creator',
			},
			medias: [
				{
					category: '',
					body: 'body',
				},
			],
		}
		await createContent(
			idMockGenerator(id),
			contentRepository,
			async () => date,
			themeRepository,
		)(data).catch((error) => {
			if (!(error instanceof BadException))
				assert.fail('Expected bad exception')
		})
	})
})
