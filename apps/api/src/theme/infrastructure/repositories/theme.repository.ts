import { Types } from 'mongoose'
import type { ThemeRepository } from 'src/theme/application/repositories/theme.repository'
import { Content } from '../../../content/infrastructure/models/content.model'
import { Theme } from '../models/theme.model'

export const themeMongoRepository = (): ThemeRepository => ({
	async save(theme) {
		await Theme.findOneAndUpdate(
			{
				_id: theme.id,
			},
			{
				_id: new Types.ObjectId(theme.id),
				name: theme.name,
				categories: theme.categories.map((e) => new Types.ObjectId(e)),
			},
			{
				upsert: true,
			},
		)
	},
	async findById(id) {
		const theme = await Theme.findById(id)
		if (!theme) return null
		return {
			id,
			name: theme.name!,
			categories: theme.categories.map(String),
		}
	},
	async findByName(name) {
		const theme = await Theme.findOne({
			name,
		})
		if (!theme) return null
		return {
			id: theme.id!,
			name: theme.name!,
			categories: theme.categories.map(String),
		}
	},
	async delete(theme) {
		await Content.deleteMany({
			theme: theme.id,
		})
		await Theme.findByIdAndDelete(theme.id)
	},
})
