import { Optional } from 'src/utils/types/optional'
import { Category } from '../model/category'

export type CategoryRepository = {
	save(category: Category): Promise<void>
	findByName(name: string): Promise<Optional<Category>>
	findById(id: string): Promise<Optional<Category>>
}
