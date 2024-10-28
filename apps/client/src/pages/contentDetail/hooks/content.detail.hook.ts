import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosGetManager } from '../../../utils/axios/axios.get.manager'
import { Content } from '../types/content.detail'

export const useContentDetail = () => {
	const { contentId } = useParams()
	const [content, setContent] = useState<Content>()
	const getManager = axiosGetManager()

	const loadData = async () => {
		const data = await getManager.work<Content>({
			url: '/content/' + contentId,
			headers: {
				authorization: Cookie.get('session'),
			},
			queries: {},
		})
		setContent(data)
	}

	useEffect(() => {
		loadData()
	}, [])

	return {
		content,
		isLoading: getManager.isLoading,
	}
}
