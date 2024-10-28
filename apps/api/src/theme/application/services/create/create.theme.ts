import { CategoryRepository } from 'src/category/application/repositories/category.repository'
import { IDGenerator } from 'src/core/application/id.generator'
import { ApplicationService } from 'src/core/application/service'
import { BadException } from '../../../../core/application/exceptions/bad.exception'
import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import { ThemeRepository } from '../../repositories/theme.repository'
import { CreateThemeDTO } from './types/dto'
import { CreateThemeResponse } from './types/response'

export const createTheme =
	(
		idGenerator: IDGenerator,
		themeRepository: ThemeRepository,
		categoryRepository: CategoryRepository,
	): ApplicationService<CreateThemeDTO, CreateThemeResponse> =>
	async (data) => {
		const possibleTheme = await themeRepository.findByName(data.name)
		if (possibleTheme) throw new BadException('Theme name already exist')
		await Promise.all(
			data.categories.map(async (e) => {
				const category = await categoryRepository.findById(e)
				if (!category) throw new NotFoundException('Category not exist')
			}),
		)
		const themeId = await idGenerator()
		await themeRepository.save({
			...data,
			id: themeId,
		})
		return {
			id: themeId,
		}
	}
