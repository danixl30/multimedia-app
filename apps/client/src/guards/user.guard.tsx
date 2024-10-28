import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, UserContext } from '../context/user.context'

export const UserGuard = (props: {
	children: ReactNode | ReactNode[]
	roles?: User['type'][]
	alternativeRoute?: string
}) => {
	const user = useContext(UserContext)
	const navigate = useNavigate()
	useEffect(() => {
		if (
			(!user.isLoading && !user.user) ||
			(Boolean(user.user) &&
				Boolean(props.roles?.length) &&
				!props.roles!.includes(user.user!.type))
		) {
			navigate(props.alternativeRoute ?? '/')
		}
	}, [user.user, user.isLoading])
	return <>{props.children}</>
}
