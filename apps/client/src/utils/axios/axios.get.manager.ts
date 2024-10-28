import { useRef, useState } from 'react'
import { axiosInstance } from './axios'

export const axiosGetManager = () => {
	const controller = useRef(new AbortController())
	const [isLoading, setIsLoading] = useState(false)

	const work = async <T>(data: {
		url: string
		queries: object
		headers: object
	}) => {
		controller.current = new AbortController()
		setIsLoading(true)
		try {
			const resp = await axiosInstance.get<T>(data.url, {
				params: data.queries,
				headers: data.headers,
				signal: controller.current.signal,
			})
			setIsLoading(false)
			return resp.data
		} catch (error) {
			console.log(error)
			setIsLoading(false)
			throw error
		}
	}

	// useEffect(() => () => controller.current.abort(), [])

	return {
		isLoading,
		work,
	}
}
