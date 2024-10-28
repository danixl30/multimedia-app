import { z } from 'zod'

export const createThemeSchema = z.object({
	name: z.string().min(4),
	categories: z.array(z.string()),
})
