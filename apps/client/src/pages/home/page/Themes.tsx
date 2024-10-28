import {
	Button,
	CircularProgress,
	List,
	ListItemButton,
	ListItemText,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useContext } from 'react'
import { NormalInput } from '../../../components/normal.input'
import { SearchContext } from '../../../context/search.context'
import { useThemePorvider } from '../hooks/theme.hook'

export const ThemeSelector = () => {
	const {
		themes,
		isLoading,
		selectTheme,
		clearTheme,
		themeTerm,
		onChangeThemeTerm,
	} = useThemePorvider()
	const { theme: themeSelected } = useContext(SearchContext)
	if (isLoading && !themes.length)
		return (
			<>
				<CircularProgress />
			</>
		)
	return (
		<>
			<Paper elevation={8} sx={{ padding: 2 }}>
				<Stack spacing={2}>
					<Typography variant="h4">Themes</Typography>
					<NormalInput
						label="Search"
						value={themeTerm}
						onChange={onChangeThemeTerm}
						helper=""
					/>
					<List>
						{themes.map((theme) => (
							<ListItemButton
								key={theme.id}
								onClick={() => selectTheme(theme.id)}
								selected={theme.id === themeSelected}
							>
								<ListItemText primary={theme.name} />
							</ListItemButton>
						))}
					</List>
					<Button variant="contained" onClick={() => clearTheme()}>
						Clear
					</Button>
				</Stack>
			</Paper>
		</>
	)
}
