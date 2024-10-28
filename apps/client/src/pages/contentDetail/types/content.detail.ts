export type Content = {
	id: string
	picture: string
	title: string
	theme: {
		id: string
		name: string
	}
	medias: {
		category: string
		name: string
		body: string
	}[]
	createdBy: {
		id: string
		username: string
	}
	creationDate: Date
}
