import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const CustomSelect = (props: {
	value?: string
	label: string
	onChange: (value: string) => void
	items: {
		key: string
		value: string
	}[]
}) => {
	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={props.value}
				label="Age"
				onChange={(e) => props.onChange(e.target.value.toString())}
			>
				{props.items.map((item) => (
					<MenuItem value={item.key}>{item.value}</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
