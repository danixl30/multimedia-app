import { AccountCircle, CloseRounded } from '@mui/icons-material'
import {
	Button,
	Grid2,
	IconButton,
	Modal,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../../context/user.context'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	borderRadious: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
}

export const UserModal = (props: {
	open: boolean
	onClose: () => void
}) => {
	const user = useContext(UserContext)
	const logout = () => {
		props.onClose()
		user.logout()
	}
	return (
		<Modal
			open={props.open}
			onClose={props.onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Paper square={false} sx={style}>
				<Grid2
					container
					alignItems="end"
					justifyContent="flex-end"
					direction="row"
					size={12}
				>
					<Grid2>
						<IconButton onClick={() => props.onClose()}>
							<CloseRounded />
						</IconButton>
					</Grid2>
				</Grid2>
				<Grid2 container justifyContent="center" sx={{ paddingY: 8 }}>
					<AccountCircle sx={{ transform: 'scale(6)' }} />
				</Grid2>
				<Stack
					spacing={1}
					alignItems="center"
					direction="column"
					justifyContent="center"
				>
					<Typography
						alignItems="center"
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						{'Username: ' + user.user?.username}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{'Email: ' + user.user?.email}
					</Typography>
					<Typography>{'User type: ' + user.user?.type}</Typography>
					<Button variant="contained" onClick={() => logout()}>
						Logout
					</Button>
				</Stack>
			</Paper>
		</Modal>
	)
}
