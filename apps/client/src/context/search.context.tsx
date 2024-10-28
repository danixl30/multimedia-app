import { ReactNode, createContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SearchContext = createContext<{
	title: string
	setTitle(title: string): void
	theme: string
	setTheme(theme: string): void
	search(): void
}>(undefined as unknown as any)

export const SearchContextProvider = (props: {
	children: ReactNode | ReactNode[]
}) => {
	const [title, setTitle] = useState('')
	const [theme, setTheme] = useState('')
	const [_searchParams, setSearchParams] = useSearchParams()

	const search = () => {
		const map: Record<string, string> = {}
		if (title) map['title'] = title
		else delete map['title']
		if (theme) map['theme'] = theme
		else delete map['theme']
		setSearchParams(map)
	}
	return (
		<SearchContext.Provider
			value={{
				title,
				setTitle,
				search,
				theme,
				setTheme,
			}}
		>
			{props.children}
		</SearchContext.Provider>
	)
}
