import { z } from 'zod'
import { roles } from '../../../application/models/user'

export const createUserSchema = z.object({
	username: z.string().min(4),
	email: z.string().email(),
	password: z.string().min(5),
	type: z.enum(roles),
})
