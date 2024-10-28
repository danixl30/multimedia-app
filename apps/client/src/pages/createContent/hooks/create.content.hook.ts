import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosGetManager } from '../../../utils/axios/axios.get.manager'
import { axiosPostManager } from '../../../utils/axios/axios.post.manager'
import { Theme } from '../../home/types/theme'
import { ThemeDetail } from '../types/theme.detail'

export const useCreateContent = () => {
	const [title, setTitle] = useState('')
	const [titleError, setTitleError] = useState('')
	const [picture, setPicture] = useState('')
	const [themes, setThemes] = useState<Theme[]>([])
	const [themeSelected, setThemeSelected] = useState<ThemeDetail>()
	const getManager = axiosGetManager()
	const postManager = axiosPostManager()
	const [category, setCategory] = useState<string>()
	const [body, setBody] = useState<string>('')
	const [bodyError, setBodyError] = useState<string>('')
	const navigate = useNavigate()

	const selectTheme = async (id: string) => {
		const data = await getManager.work<ThemeDetail>({
			url: '/theme/' + id,
			headers: {
				authorization: Cookie.get('session'),
			},
			queries: {},
		})
		setThemeSelected(data)
		setCategory(undefined)
		setBody('')
	}

	const isSubmitable = () =>
		title &&
		!titleError &&
		category &&
		themeSelected &&
		body &&
		!bodyError &&
		picture

	const onChangeTitle = (title: string) => {
		setTitle(title)
	}

	const onChangeBody = (body: string) => {
		setBody(body)
	}

	const onChangePicture = (picture: string) => {
		setPicture(picture)
	}

	const onChangeCategory = (category: string) => {
		if (themeSelected?.categories.some((e) => e.id === category))
			setCategory(category)
	}

	useEffect(() => {
		if (title && title.length < 5) setTitleError('Unvalid title')
		else setTitleError('')
	}, [title])

	useEffect(() => {
		if (body && body.length < 5) setBodyError('Unvalid body')
		setBodyError('')
	}, [body])

	const loadThemes = async () => {
		const data = await getManager.work<Theme[]>({
			url: '/theme/many',
			headers: {
				authorization: Cookie.get('session'),
			},
			queries: {},
		})
		setThemes(data)
	}

	useEffect(() => {
		loadThemes()
	}, [])

	const submit = async () => {
		if (!isSubmitable()) toast.error('Not valid')
		await postManager.work({
			body: {
				title,
				theme: themeSelected?.id,
				picture,
				medias: [
					{
						category,
						body,
					},
				],
			},
			headers: {
				authorization: Cookie.get('session'),
			},
			url: '/content',
		}).catch(() => {
            toast.error('Internal server error')
        })
		toast.success('Content created')
		navigate('/')
	}

	return {
		themes,
		themeSelected,
		body,
		bodyError,
		title,
		titleError,
		submit,
		isSubmitable,
		selectTheme,
		onChangeTitle,
		onChangeBody,
		onChangeCategory,
		picture,
		category,
		onChangePicture,
	}
}
