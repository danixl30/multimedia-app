import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { axiosGetManager } from '../../../utils/axios/axios.get.manager'
import { Content } from '../types/content'

const perPage = 20
export const useHomePage = () => {
	const [contents, setContents] = useState<Content[]>([])
	const [page, setPage] = useState(1)
	const topPage = useRef(1)
	const getManager = axiosGetManager()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const fetchPage = async () => {
		if (page === 0 || getManager.isLoading) return
		const data = await getManager.work<Content[]>({
			url: '/content/many',
			headers: {},
			queries: {
				page,
				perPage,
				title: searchParams.get('title'),
				theme: searchParams.get('theme'),
			},
		})
		setContents((contents) => [...contents, ...data])
	}

	const calculatePagination = async () => {
		const data = await getManager.work<{
			pages: number
		}>({
			url: '/content/calculate/pagination',
			headers: {},
			queries: {
				perPage,
				title: searchParams.get('title'),
				theme: searchParams.get('theme'),
			},
		})
		setContents([])
		topPage.current = data.pages
		setPage(1)
		await fetchPage()
	}

	const onClickContent = (id: string) => navigate('/content/' + id)

	const getMore = () => {
		if (page !== topPage.current && !getManager.isLoading) {
			setPage((page) => page + 1)
			fetchPage()
		}
	}

	useEffect(() => {
		calculatePagination()
	}, [searchParams])

	return {
		contents,
		getMore,
		isLoading: getManager.isLoading,
		onClickContent,
		page,
		isTop: page === topPage.current,
	}
}
