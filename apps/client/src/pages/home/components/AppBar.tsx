import { AccountCircle } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SearchIcon from '@mui/icons-material/Search'
import {
	Box,
	Button,
	IconButton,
	InputBase,
	Toolbar,
	Tooltip,
	alpha,
	styled,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../../context/search.context'
import { UserContext } from '../../../context/user.context'
import { UserModal } from './UserModal'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))

export const CustomAppBar = () => {
	const [openModal, setOpenModal] = useState(false)
	const user = useContext(UserContext)
	const search = useContext(SearchContext)
	const navigate = useNavigate()
	if (user.user)
		return (
			<>
				<UserModal
					open={openModal}
					onClose={() => setOpenModal(false)}
				/>
				<AppBar
					sx={{ marginBottom: 3 }}
					position="static"
					component="nav"
				>
					<Toolbar>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								onChange={(e) =>
									search.setTitle(e.target.value)
								}
								value={search.title}
								placeholder="Search title…"
								inputProps={{ 'aria-label': 'search' }}
								onKeyPress={(e) => {
									if (e.key === 'Enter') search.search()
								}}
							/>
						</Search>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							{user.user.type === 'CREATOR' && (
								<Tooltip title="Create content">
									<IconButton
										onClick={() =>
											navigate('/create/content')
										}
										size="large"
										edge="end"
										aria-label="account of current user"
										aria-haspopup="true"
										color="inherit"
									>
										<AddCircleIcon />
									</IconButton>
								</Tooltip>
							)}
							<Tooltip title="Account">
								<IconButton
									onClick={() => setOpenModal(true)}
									size="large"
									edge="end"
									aria-label="account of current user"
									aria-haspopup="true"
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
							</Tooltip>
						</Box>
					</Toolbar>
				</AppBar>
			</>
		)
	return (
		<AppBar
			sx={{
				marginBottom: 3,
			}}
			component="nav"
			position="static"
		>
			<Toolbar>
				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					<Button
						onClick={() => navigate('/register')}
						sx={{ color: '#fff' }}
					>
						Register
					</Button>
					<Button
						onClick={() => navigate('/login')}
						sx={{ color: '#fff' }}
					>
						login
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
