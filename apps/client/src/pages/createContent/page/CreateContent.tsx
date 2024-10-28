import {
	Button,
	Paper,
	Stack,
	TextareaAutosize,
	Typography,
} from '@mui/material'
import ReactPlayer from 'react-player'
import { CustomSelect } from '../../../components/custom.select'
import { NormalInput } from '../../../components/normal.input'
import { useCreateContent } from '../hooks/create.content.hook'

export default function CreateContentPage() {
	const {
		themes,
		themeSelected,
		onChangeBody,
		onChangeTitle,
		onChangePicture,
		onChangeCategory,
		submit,
		title,
		body,
		category,
		titleError,
		picture,
		bodyError,
		selectTheme,
		isSubmitable,
        onErrorBody
	} = useCreateContent()
	return (
		<>
			<Paper
				elevation={12}
				sx={{ marginX: '20%', marginTop: '10%', padding: 5 }}
			>
				<Stack
					spacing={2}
					alignItems="center"
					direction="column"
					justifyContent="center"
				>
					<Typography sx={{ fontWeight: 'bold' }} variant="h2">
						Create content
					</Typography>
					<NormalInput
						label="Title"
						value={title}
						onChange={onChangeTitle}
						error={titleError}
						helper="Set content title"
					/>
					<NormalInput
						label="Picture"
						value={picture}
						onChange={onChangePicture}
						helper="Set picture URL"
					/>
					{picture && (
						<img
							width="100%"
							height="auto"
							style={{ borderRadius: 10 }}
							src={picture}
							alt="picture"
						/>
					)}
					<CustomSelect
						label="Theme"
						onChange={selectTheme}
						items={themes.map((e) => ({
							key: e.id,
							value: e.name,
						}))}
						value={themeSelected?.id}
					/>
					{themeSelected && (
						<>
							<CustomSelect
								label="Category"
								value={category}
								onChange={onChangeCategory}
								items={themeSelected.categories.map((e) => ({
									key: e.id,
									value: e.name,
								}))}
							/>
							<NormalInput
								label="Body"
								value={body}
								onChange={onChangeBody}
								helper="Set content body"
								error={bodyError}
							/>
							{!bodyError && body &&
								themeSelected.categories
									.find((e) => e.id === category)
									?.name.toLowerCase()
									.includes('youtube') && (
									<>
										<ReactPlayer onError={() => onErrorBody()} url={body} />
									</>
								)}
							{!bodyError && body &&
								themeSelected.categories
									.find((e) => e.id === category)
									?.name.toLowerCase()
									.includes('image') && (
									<img
										style={{ borderRadius: 10 }}
										width="100%"
										height="auto"
										src={body}
									/>
								)}
									<TextareaAutosize
										minRows={3}
										readOnly
										defaultValue={body}
									/>
						</>
					)}
					<Button
						variant="contained"
						disabled={!Boolean(isSubmitable())}
						onClick={() => submit()}
					>
						Create
					</Button>
				</Stack>
			</Paper>
		</>
	)
}
