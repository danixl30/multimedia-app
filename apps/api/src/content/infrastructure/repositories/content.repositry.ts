import { Types } from 'mongoose'
import type { ContentRepository } from 'src/content/application/repositories/content.repository'
import { User } from '../../../user/infrastructure/models/user.model'
import { Content } from '../models/content.model'

export const contentMongoRepository = (): ContentRepository => ({
	async save(content) {
		await Content.findOneAndUpdate(
			{
				_id: content.id,
			},
			{
				_id: new Types.ObjectId(content.id),
				title: content.title,
				picture: content.picture,
				createdBy: new Types.ObjectId(content.createdBy.id),
				creationDate: content.creationDate,
				theme: new Types.ObjectId(content.theme),
				medias: content.medias.map((e) => ({
					...e,
					category: new Types.ObjectId(e.category),
				})),
			},
			{
				upsert: true,
			},
		)
	},
	async findById(id) {
		const content = await Content.findById(id)
		if (!content) return null
		const user = await User.findById(content.createdBy)
		return {
			id,
			title: content.title!,
			picture: content.picture!,
			createdBy: {
				id: user!.id!,
				username: user!.username!,
			},
			creationDate: content.creationDate!,
			theme: String(content.theme),
			medias: content.medias.map((e) => ({
				category: String(e.category),
				body: e.body!,
			})),
		}
	},
})
