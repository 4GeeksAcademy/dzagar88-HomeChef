import { useContext } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const Home = () => {
	const [alignment, setAlignment] = React.useState('web');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const { store, actions } = useContext(Context);

	if (store.token) {
		return (
			<div className="container">
				<ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					className="Toggle"
				>
					<ToggleButton value="diner">Diner</ToggleButton>
					<ToggleButton value="chef">Chef</ToggleButton>
				</ToggleButtonGroup>
			</div>
		);
	} else {
		return (
			<div className="text-center mt-5">
				Welcome to HomeChef
			</div>
		);
	}
};
