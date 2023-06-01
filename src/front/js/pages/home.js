import { useContext } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Chef } from '../component/chef';
import { Diner } from '../component/diner';

export const Home = () => {
	const [alignment, setAlignment] = React.useState('diner');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const { store, actions } = useContext(Context);

	const handleClick = (value) => {
		console.log(`Button ${value} clicked!`);
	};

	const toggleButton = () => {
		if (alignment === 'diner') {
			return <Diner />;
		} else {
			return <Chef />;
		}
	}

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
					<ToggleButton value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
					<ToggleButton value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
					{toggleButton()}
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
