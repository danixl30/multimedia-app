import mongoose from 'mongoose'

const URL = process.env.MONGO_URL

mongoose
	.connect(URL!)
	.then(() => console.log('Database connected'))
	.catch((e) => {
		throw e
	})
