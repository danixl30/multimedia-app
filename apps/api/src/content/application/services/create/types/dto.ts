export type CreateContentDTO = {
	title: string
	picture: string
	theme: string
	medias: {
		category: string
		body: string
	}[]
	createdBy: {
		id: string
		username: string
	}
}
