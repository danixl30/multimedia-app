import Cookie from 'js-cookie'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { axiosGetManager } from '../utils/axios/axios.get.manager'
import { Optional } from '../utils/types/optional'

export type User = {
	id: string
	username: string
	email: string
	type: 'ADMIN' | 'CREATOR' | 'READER'
}

export const UserContext = createContext<{
	user: Optional<User>
	isLoading: boolean
	logout(): void
	toggleSession(): void | Promise<void>
}>(undefined as unknown as any)

export function UserContextProvider(props: {
	children: ReactNode | ReactNode[]
}) {
	const [user, setUser] = useState<Optional<User>>()
	const [isLoading, setIsLoading] = useState(true)
	const getManager = axiosGetManager()

	const toggleSession = async () => {
		if (!Cookie.get('session')) {
			setIsLoading(false)
			setUser(null)
			return
		}
		setIsLoading(true)
		try {
			const data = await getManager.work<User>({
				headers: {
					authorization: Cookie.get('session'),
				},
				url: '/user/current',
				queries: {},
			})
			setUser(data)
		} catch (_error) {
			setUser(null)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		toggleSession()
	}, [])

	const logout = () => {
		Cookie.remove('session')
		setUser(null)
	}

	return (
		<>
			<UserContext.Provider
				value={{
					user,
					logout,
					isLoading,
					toggleSession,
				}}
			>
				{props.children}
			</UserContext.Provider>
		</>
	)
}
