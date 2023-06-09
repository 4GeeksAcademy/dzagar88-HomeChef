import { useContext } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Chef } from '../component/chef';
import { Diner } from '../component/diner';
import homechefBG from "../../img/homechefBG.jpg"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export const Home = () => {
	const [alignment, setAlignment] = React.useState('home');
	const navigate = useNavigate();
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	const { store, actions } = useContext(Context);
	const handleClick = (value) => {
		console.log(`Button ${value} clicked!`);
		if (value === "home") {
			navigate("/");
		} else if (value === "diner") {
			navigate("/diner");
		} else {
			navigate("/chef");
		}

	};
	const toggleButton = () => {
		if (alignment === 'home') {
			return <Home />;
		} else if (alignment === 'diner') {
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
					backgroundPosition: "center",
					height: "783px"
				}}
			>
				{/* <ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					className="Toggle margin16"
				>
					<ToggleButton className="bg-light border" value="home" onClick={() => handleClick('home')}>Home</ToggleButton>
					<ToggleButton className="bg-light border" value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
					<ToggleButton className="bg-light border" value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
				</ToggleButtonGroup> */}
				{/* {toggleButton()} */}
				<h1 className="white-title title-font position-absolute top-50 start-50 translate-middle opacity60 p-2">
					{"Hungry for food? Click "}
					<Link to="/diner">
						{"here"}
					</Link>
					<p className="white-title title-font d-flex justify-content-center p-2">Or...</p>
					{"Hungry for money? Click "}
					<Link to="/chef">
						{"here"}
					</Link>
				</h1>

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
					height: "783px"
				}}>
				<h1 className="white-title title-font position-absolute top-50 start-50 translate-middle opacity60 p-2">Welcome to HomeChef</h1>
			</div>
		);
	}
};