import { useState } from 'react'
import { axiosInstance } from './axios'

export const axiosPostManager = () => {
	const [isLoading, setIsLoading] = useState(false)

	const work = async <T>(data: {
		url: string
		body: object
		headers: object
	}) => {
		setIsLoading(true)
		try {
			const resp = await axiosInstance.post<T>(
				data.url,
				{
					...data.body,
				},
				{
					headers: data.headers,
				},
			)
			return resp.data
		} catch (error) {
			setIsLoading(false)
			throw error
		}
	}

	return {
		isLoading,
		work,
	}
}
