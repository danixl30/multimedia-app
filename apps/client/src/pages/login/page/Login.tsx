import { Button, Grid2, Paper, Typography } from '@mui/material'
import { NormalInput } from '../../../components/normal.input'
import { PasswordInput } from '../../../components/password.input'
import { useLoginPage } from '../hooks/login.hook'

export default function LoginPage() {
	const {
		formState,
		onChange,
		passwordError,
		emailError,
		onSubmit,
		isNotSubmitable,
	} = useLoginPage()
	return (
		<>
			<Paper
				elevation={12}
				sx={{ marginX: '25%', marginTop: '10%', padding: 5 }}
			>
				<Grid2
					container
					alignItems="center"
					justifyContent="center"
					spacing={2}
				>
					<Grid2 size={12}>
						<Typography
							sx={{ fontWeight: 'bold' }}
							align="center"
							variant="h2"
						>
							Login
						</Typography>
					</Grid2>
					<Grid2 justifyContent="center" size={6}>
						<NormalInput
							label="Email"
							onChange={(data) => onChange('email', data)}
							value={formState.email}
							error={emailError}
							helper="User email"
						/>
					</Grid2>
					<Grid2 justifyContent="center" alignItems="center" size={6}>
						<PasswordInput
							label="Password"
							onChange={(data) => onChange('password', data)}
							value={formState.password}
							error={passwordError}
							helper="User password"
						/>
					</Grid2>
					<Button
						disabled={Boolean(isNotSubmitable())}
						onClick={() => onSubmit()}
						variant="contained"
					>
						Login
					</Button>
				</Grid2>
			</Paper>
		</>
	)
}
