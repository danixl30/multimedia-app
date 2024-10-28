import { Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import { useContext } from 'react'
import { UserContext } from '../../../context/user.context'
import { CustomAppBar } from '../components/AppBar'
import { useHomePage } from '../hooks/home.hook'
import { ThemeSelector } from './Themes'

export default function HomePage() {
	const { contents, isLoading, getMore, onClickContent, isTop } =
		useHomePage()
	const user = useContext(UserContext)
	if (!contents.length && isLoading)
		return (
			<>
				<Grid2 container spacing={2}>
					{Array(9)
						.fill(undefined)
						.map((_, index) => (
							<Grid2 key={index} size={4}>
								<Skeleton
									sx={{ bgcolor: 'grey.900' }}
									variant="rectangular"
									width={210}
									height={118}
								/>
							</Grid2>
						))}
				</Grid2>
			</>
		)
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<CustomAppBar />
				<Grid2 container spacing={2} justifyContent="center">
					{user.user && (
						<Grid2 size={2}>
							<ThemeSelector />
						</Grid2>
					)}
					<Grid2 size={10}>
						<Box sx={{ flexGrow: 1 }}>
							<Grid2 container spacing={2}>
								{contents.map((content) => (
									<Grid2 key={content.id} size={4}>
										<Paper
											elevation={8}
											sx={{ padding: 2 }}
											onClick={() =>
												onClickContent(content.id)
											}
										>
											<Stack spacing={1}>
												<img
													width="100%"
													height="auto"
													style={{ borderRadius: 10 }}
													src={content.picture}
													alt={content.title}
												/>
												<Typography variant="h4">
													{content.title}
												</Typography>
												<Typography variant="caption">
													{new Date(
														content.creationDate,
													).toDateString()}
												</Typography>
											</Stack>
										</Paper>
									</Grid2>
								))}
								<Grid2
									alignItems="center"
									justifyContent="center"
									size={12}
								>
									<Button
										onClick={() => getMore()}
										disabled={isLoading || isTop}
										variant="contained"
									>
										Get More
									</Button>
								</Grid2>
							</Grid2>
						</Box>
					</Grid2>
				</Grid2>
			</Box>
		</>
	)
}
