import { z } from 'zod'

export const createContentSchema = z.object({
	title: z.string().min(4),
	picture: z.string().min(5),
	theme: z.string(),
	medias: z.array(
		z.object({
			category: z.string(),
			body: z.string().min(5),
		}),
	),
})
