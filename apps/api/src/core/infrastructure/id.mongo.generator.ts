import { Types } from 'mongoose'
import { IDGenerator } from '../application/id.generator'

export const mongoIdGenerator: IDGenerator = async () =>
	String(new Types.ObjectId())
