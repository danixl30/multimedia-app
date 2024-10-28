import { IDGenerator } from 'src/core/application/id.generator'

export const idMockGenerator =
	(id: string): IDGenerator =>
	async () =>
		id
