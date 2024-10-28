import { Category } from 'src/category/application/model/category'
import { CategoryRepository } from 'src/category/application/repositories/category.repository'

export const categoryRepositoryMock = (
	categories: Category[] = [],
): CategoryRepository => ({
	async save(category) {
		categories.push(category)
	},
	async findById(id) {
		return categories.find((e) => e.id === id)
	},
	async findByName(name) {
		return categories.find((e) => e.name === name)
	},
})
