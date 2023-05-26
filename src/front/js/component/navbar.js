import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	if (store.token) {
		return (
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">HomeChef</span>
					</Link>
					<div className="ml-auto">
						<Link to="/signup">
							<button className="btn btn-primary">{"Sign Up"}</button>
						</Link>
						<Link to="/login">
							<button className="btn btn-primary mx-2">{"Login"}</button>
						</Link>
					</div>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">HomeChef</span>
					</Link>
					<div className="ml-auto">
						<Link to="">
							<button className="btn btn-primary">{"Profile"}</button>
						</Link>
						<Link to="">
							<button className="btn btn-primary mx-2">{"Log out"}</button>
						</Link>
					</div>
				</div>
			</nav>
		);
	}
};
