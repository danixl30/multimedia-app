import { Optional } from 'src/utils/types/optional'
import { Theme } from '../models/theme'

export type ThemeRepository = {
	save(theme: Theme): Promise<void>
	delete(theme: Theme): Promise<void>
	findById(id: string): Promise<Optional<Theme>>
	findByName(name: string): Promise<Optional<Theme>>
}
