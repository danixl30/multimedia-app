import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosPostManager } from '../../../utils/axios/axios.post.manager'
import { emailRegExp } from '../../../utils/regExps/email'
import { AxiosError } from 'axios'

export type RegisterFormState = {
	email: string
	password: string
	confirmPassword: string
	username: string
	isCreator: boolean
}

export const useRegisterPage = () => {
	const [formState, setFormState] = useState<RegisterFormState>({
		email: '',
		password: '',
		confirmPassword: '',
		username: '',
		isCreator: false,
	})
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [usernameError, setUsernameError] = useState('')
	const [confirmPasswordError, setConfirmPasswordError] = useState('')
	const postManager = axiosPostManager()
	const navigate = useNavigate()

	const toggleIsCreator = () => {
		setFormState({
			...formState,
			isCreator: !formState.isCreator,
		})
	}

	const onChange = (
		key: 'email' | 'password' | 'confirmPassword' | 'username',
		value: string,
	) => {
		setFormState({
			...formState,
			[key]: value,
		})
	}

	const isNotSubmitable = () =>
		emailError ||
		!formState?.email ||
		passwordError ||
		!formState.password ||
		usernameError ||
		!formState.username ||
		confirmPasswordError ||
		!formState.confirmPassword

	const onSubmit = async () => {
		if (isNotSubmitable()) toast.error('Unvalid register')
		try {
			await postManager.work<any>({
				url: '/user',
				body: {
					email: formState.email,
					username: formState.username,
					password: formState.password,
					type: formState.isCreator ? 'CREATOR' : 'READER',
				},
				headers: {},
			})
			toast.success('Register successfull')
			navigate('/login')
		} catch (error: any) {
            if ((error instanceof AxiosError) && error.status === 400) {
                toast.error('Unvalid credentials')
            } else
            toast.error('Internal server error')
		}
	}

	useEffect(() => {
		if (formState?.email && !emailRegExp.test(formState?.email))
			setEmailError('Unvalid email')
		else setEmailError('')
		if (formState?.password && formState.password.length < 5)
			setPasswordError('Password too short')
		else setPasswordError('')
		if (
			formState.confirmPassword &&
			formState.confirmPassword !== formState.password
		)
			setConfirmPasswordError('The passwords must be equals')
		else setConfirmPasswordError('')
		if (formState.username && formState.username.length < 5)
			setUsernameError('Unvalid username')
		else setUsernameError('')
	}, [formState])

	return {
		onChange,
		onSubmit,
		passwordError,
		emailError,
		formState,
		usernameError,
		confirmPasswordError,
		isNotSubmitable,
		toggleIsCreator,
	}
}
