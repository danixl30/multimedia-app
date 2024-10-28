import { IDGenerator } from 'src/core/application/id.generator'
import { ApplicationService } from 'src/core/application/service'
import { BadException } from '../../../../core/application/exceptions/bad.exception'
import { CategoryRepository } from '../../repositories/category.repository'
import { CreateCategoryDTO } from './types/dto'
import { CreateCategoryResponse } from './types/response'

export const createCategory =
	(
		idGenerator: IDGenerator,
		categoryRepository: CategoryRepository,
	): ApplicationService<CreateCategoryDTO, CreateCategoryResponse> =>
	async (data) => {
		const possibleCategory = await categoryRepository.findByName(data.name)
		if (possibleCategory) throw new BadException('Category already exist')
		const id = await idGenerator()
		await categoryRepository.save({
			...data,
			id,
		})
		return {
			id,
		}
	}
