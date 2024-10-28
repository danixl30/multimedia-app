import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import { useState } from 'react'

export const PasswordInput = (props: {
	label: string
	value: string
	onChange: (data: string) => void
	error?: string
	helper: string
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
	}
	return (
		<FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
			<InputLabel htmlFor="outlined-adornment-password">
				{props.label}
			</InputLabel>
			<OutlinedInput
				id="outlined-adornment-password"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				type={showPassword ? 'text' : 'password'}
				error={Boolean(props.error)}
				aria-describedby="component-helper-text"
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={
								showPassword
									? 'hide the password'
									: 'display the password'
							}
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							onMouseUp={handleMouseUpPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
			/>
			<FormHelperText id="component-helper-text">
				{props.error || props.helper}
			</FormHelperText>
		</FormControl>
	)
}
