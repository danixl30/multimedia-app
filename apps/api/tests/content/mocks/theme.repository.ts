import { Theme } from 'src/theme/application/models/theme'
import { ThemeRepository } from 'src/theme/application/repositories/theme.repository'

export const themeRepositoryMock = (themes: Theme[] = []): ThemeRepository => ({
	async save(theme) {
		themes.push(theme)
	},
	async findById(id) {
		return themes.find((e) => e.id === id)
	},
	async findByName(name) {
		return themes.find((e) => e.name === name)
	},
	async delete(_theme) {},
})
