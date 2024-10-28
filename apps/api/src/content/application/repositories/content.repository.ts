import { Optional } from 'src/utils/types/optional'
import { Content } from '../models/content'

export type ContentRepository = {
	save(content: Content): Promise<void>
	findById(id: string): Promise<Optional<Content>>
}
