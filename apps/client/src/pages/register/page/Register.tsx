import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid2,
	Paper,
	Typography,
} from '@mui/material'
import { NormalInput } from '../../../components/normal.input'
import { PasswordInput } from '../../../components/password.input'
import { useRegisterPage } from '../hooks/register.hook'

export default function RegisterPage() {
	const {
		formState,
		onChange,
		passwordError,
		emailError,
		onSubmit,
		confirmPasswordError,
		usernameError,
		isNotSubmitable,
		toggleIsCreator,
	} = useRegisterPage()
	const notSubmit = isNotSubmitable()
	return (
		<>
			<Paper
				elevation={12}
				sx={{ marginX: '25%', marginTop: '10%', padding: 5 }}
			>
				<Grid2 container spacing={2} justifyContent="center">
					<Grid2 size={12}>
						<Typography
							align="center"
							sx={{ fontWeight: 'bold' }}
							variant="h2"
						>
							Register
						</Typography>
					</Grid2>
					<Grid2 size={6}>
						<NormalInput
							label="Email"
							onChange={(data) => onChange('email', data)}
							value={formState.email}
							error={emailError}
							helper="User email"
						/>
					</Grid2>
					<Grid2 size={6}>
						<NormalInput
							label="Username"
							onChange={(data) => onChange('username', data)}
							value={formState.username}
							error={usernameError}
							helper="Username for user"
						/>
					</Grid2>
					<Grid2 size={6}>
						<PasswordInput
							label="Password"
							onChange={(data) => onChange('password', data)}
							value={formState.password}
							error={passwordError}
							helper="User password"
						/>
					</Grid2>
					<Grid2 size={6}>
						<PasswordInput
							label="Confirm Password"
							onChange={(data) =>
								onChange('confirmPassword', data)
							}
							value={formState.confirmPassword}
							error={confirmPasswordError}
							helper="Gornfirm user password"
						/>
					</Grid2>
					<Grid2 size={12} sx={{ paddingLeft: 6 }}>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={formState.isCreator}
										onChange={() => toggleIsCreator()}
									/>
								}
								label="Is creator"
							/>
						</FormGroup>
					</Grid2>
					<Button
						disabled={Boolean(notSubmit)}
						onClick={() => onSubmit()}
						variant="contained"
					>
						Register
					</Button>
				</Grid2>
			</Paper>
		</>
	)
}
