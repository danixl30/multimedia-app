import { Theme } from '../../home/types/theme'

export type ThemeDetail = Theme & {
	categories: {
		id: string
		name: string
	}[]
}
