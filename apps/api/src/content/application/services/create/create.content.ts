import type { GetCurrentDate } from 'src/core/application/date.generator'
import type { IDGenerator } from 'src/core/application/id.generator'
import type { ApplicationService } from 'src/core/application/service'
import type { ThemeRepository } from 'src/theme/application/repositories/theme.repository'
import { BadException } from '../../../../core/application/exceptions/bad.exception'
import { NotFoundException } from '../../../../core/application/exceptions/not.found.exception'
import type { ContentRepository } from '../../repositories/content.repository'
import type { CreateContentDTO } from './types/dto'
import type { CreateContentResponse } from './types/response'

export const createContent =
	(
		idGenerator: IDGenerator,
		contentRepository: ContentRepository,
		dateGenerateror: GetCurrentDate,
		themeRepository: ThemeRepository,
	): ApplicationService<CreateContentDTO, CreateContentResponse> =>
	async (data) => {
		const theme = await themeRepository.findById(data.theme)
		if (!theme) throw new NotFoundException('Theme not exist')
		if (data.medias.some((e) => !theme.categories.includes(e.category)))
			throw new BadException('Unvalid category to include')
		const id = await idGenerator()
		await contentRepository.save({
			...data,
			id,
			creationDate: await dateGenerateror(),
		})
		return {
			id,
		}
	}
