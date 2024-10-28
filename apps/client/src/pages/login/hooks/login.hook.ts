import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/user.context'
import { axiosPostManager } from '../../../utils/axios/axios.post.manager'
import { emailRegExp } from '../../../utils/regExps/email'

export type LoginFormState = {
	email: string
	password: string
}

export const useLoginPage = () => {
	const [formState, setFormState] = useState<LoginFormState>({
		email: '',
		password: '',
	})
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const postManager = axiosPostManager()
	const navigate = useNavigate()
	const user = useContext(UserContext)

	const onChange = (key: 'email' | 'password', value: string) => {
		setFormState({
			...formState,
			[key]: value,
		})
	}

	const isNotSubmitable = () =>
		emailError || !formState?.email || passwordError || !formState.password

	const onSubmit = async () => {
		if (isNotSubmitable()) toast.error('Unvalid login')
		try {
			const data = await postManager.work<{
				token: string
			}>({
				url: '/user/login',
				body: formState!,
				headers: {},
			})
			Cookie.set('session', data.token, {
				sameSite: 'strict',
			})
			toast.success('Login successfull')
			user.toggleSession()
			navigate('/')
		} catch (error: any) {
			console.log(error)
			if (error instanceof AxiosError && error.status === 400) {
				toast.error('Unvalid credentials')
			} else toast.error('Internal server error')
		}
	}

	useEffect(() => {
		if (formState?.email && !emailRegExp.test(formState?.email))
			setEmailError('Unvalid email')
		else setEmailError('')
		if (formState?.password && formState.password.length < 5)
			setPasswordError('Unvalid password')
		else setPasswordError('')
	}, [formState])

	return {
		onChange,
		onSubmit,
		passwordError,
		emailError,
		formState,
		isNotSubmitable,
	}
}
