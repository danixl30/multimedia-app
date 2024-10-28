import {
	FormControl,
	FormHelperText,
	InputLabel,
	OutlinedInput,
} from '@mui/material'

export const NormalInput = (props: {
	label: string
	value: string
	onChange: (data: string) => void
	error?: string
	helper: string
}) => {
	return (
		<FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
			<InputLabel htmlFor="outlined-adornment-input">
				{props.label}
			</InputLabel>
			<OutlinedInput
				id="outlined-adornment-input"
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				type="text"
				error={Boolean(props.error)}
				aria-describedby="component-helper-text"
				label={props.label}
			/>
			<FormHelperText id="component-helper-text">
				{props.error || props.helper}
			</FormHelperText>
		</FormControl>
	)
}
