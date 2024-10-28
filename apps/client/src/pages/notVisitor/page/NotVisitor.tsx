import { Button, Grid2, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotVisitorPage() {
	const navigate = useNavigate()
	return (
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
					<Typography align="center" variant="h4">
						Oops... Not visitors Here...
					</Typography>
				</Grid2>
				<Grid2 size={12}>
					<Typography align="center" variant="body1">
						Please:
					</Typography>
				</Grid2>
				<Grid2
					container
					alignItems="center"
					justifyContent="center"
					size={6}
				>
					<Button
						onClick={() => navigate('/login')}
						variant="contained"
					>
						Login
					</Button>
				</Grid2>
				<Grid2
					container
					alignItems="center"
					justifyContent="center"
					size={6}
				>
					<Button
						onClick={() => navigate('/register')}
						variant="contained"
					>
						Register
					</Button>
				</Grid2>
				<Grid2
					container
					alignItems="center"
					justifyContent="center"
					size={12}
				>
					<Button onClick={() => navigate('/')} variant="text">
						Return to home
					</Button>
				</Grid2>
			</Grid2>
		</Paper>
	)
}
