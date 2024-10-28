import { z } from 'zod'

export const createCategorySchema = z.object({
	name: z.string().min(4),
	image: z.string().min(5),
})
