import {
	CircularProgress,
	Divider,
	Grid2,
	Paper,
	Stack,
	TextareaAutosize,
	Typography,
} from '@mui/material'
import ReactPlayer from 'react-player'
import { useContentDetail } from '../hooks/content.detail.hook'

export default function ContentDetailPage() {
	const { content, isLoading } = useContentDetail()
	if (!content || isLoading)
		return (
			<>
				<CircularProgress />
			</>
		)
	return (
		<>
			<Paper
				elevation={12}
				sx={{ marginX: '10%', marginTop: '10%', padding: 5 }}
			>
				<Grid2 container spacing={2}>
					<Grid2 size={8}>
						<Stack spacing={2}>
							<Typography variant="h2">
								{content!.title}
							</Typography>
							<img
								width="100%"
								height="auto"
								style={{ borderRadius: 10 }}
								src={content?.picture}
								alt={content?.title}
							/>
							<div>
								<Typography variant="h4">Medias</Typography>
								<Divider />
							</div>
							{content?.medias.map((media) => (
								<div key={media.category}>
									{media.name
										.toLowerCase()
										.includes('youtube') && (
										<>
											<ReactPlayer url={media.body} />
										</>
									)}
									{media.name
										.toLowerCase()
										.includes('image') && (
										<img
											style={{ borderRadius: 10 }}
											width="100%"
											height="auto"
											src={media.body}
										/>
									)}
										<TextareaAutosize
											readOnly
											defaultValue={media.body}
                                            minRows={4}
										/>
								</div>
							))}
						</Stack>
					</Grid2>
					<Grid2 size={4}>
						<Paper sx={{ padding: 3 }} elevation={6}>
							<Typography variant="h5">
								Additional information
							</Typography>
							<br />
							<Typography variant="body1">
								{'Theme: ' + content?.theme.name}
							</Typography>
							<Typography variant="body2">
								{'Created by: ' + content?.createdBy.username}
							</Typography>
							<Typography variant="subtitle1">
								{'Created at: ' +
									new Date(
										content!.creationDate,
									).toDateString()}
							</Typography>
						</Paper>
					</Grid2>
				</Grid2>
			</Paper>
		</>
	)
}
