import { useContext } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Chef } from '../component/chef';
import { Diner } from '../component/diner';
import homechefBG from "../../img/homechefBG.jpg"


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
			<div
				style={{
					backgroundImage: `url(${homechefBG})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}
			>
				<ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					className="Toggle"
				>
					<ToggleButton className="bg-light border" value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
					<ToggleButton className="bg-light border" value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
				</ToggleButtonGroup>
				{toggleButton()}
			</div>
		);
	} else {
		return (
			<div className="text-center"
				style={{
					backgroundImage: `url(${homechefBG})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<h1 className="white-title title-font">Welcome to HomeChef</h1>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>

			</div>
		);
	}
};
