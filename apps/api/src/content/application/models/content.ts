export type Content = {
	id: string
	picture: string
	title: string
	theme: string
	medias: {
		category: string
		body: string
	}[]
	createdBy: {
		id: string
		username: string
	}
	creationDate: Date
}
