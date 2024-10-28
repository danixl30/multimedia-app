import Cookie from 'js-cookie'
import { useContext, useEffect, useRef, useState } from 'react'
import { SearchContext } from '../../../context/search.context'
import { axiosGetManager } from '../../../utils/axios/axios.get.manager'
import { Theme } from '../types/theme'

export const useThemePorvider = () => {
	const [themes, setThemes] = useState<Theme[]>([])
	const getManager = axiosGetManager()
	const [themeTerm, setThemeTerm] = useState('')
	const themesTotal = useRef<Theme[]>([])
	const searchContext = useContext(SearchContext)

	const loadThemes = async () => {
		const data = await getManager.work<Theme[]>({
			url: '/theme/many',
			headers: {
				authorization: Cookie.get('session'),
			},
			queries: {},
		})
		setThemes(data)
		themesTotal.current = data
	}

	useEffect(() => {
		loadThemes()
	}, [])

	const selectTheme = (id: string) => {
		searchContext.setTheme(id)
	}

	const clearTheme = () => {
		searchContext.setTheme('')
	}

	const onChangeThemeTerm = (term: string) => {
		setThemeTerm(term)
	}

	useEffect(() => {
		setThemes(
			themesTotal.current.filter((e) =>
				e.name.toLowerCase().includes(themeTerm),
			),
		)
	}, [themeTerm, themes])

	return {
		themes,
		isLoading: getManager.isLoading,
		selectTheme,
		clearTheme,
		themeTerm,
		onChangeThemeTerm,
	}
}
