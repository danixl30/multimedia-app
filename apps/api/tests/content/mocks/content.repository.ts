import { Content } from 'src/content/application/models/content'
import { ContentRepository } from 'src/content/application/repositories/content.repository'

export const contentMockRepository = (
	contents: Content[] = [],
): ContentRepository => ({
	async save(content) {
		contents.push(content)
	},
	async findById(id) {
		return contents.find((e) => e.id === id)
	},
})
