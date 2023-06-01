import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		navigate("/");
	};

	if (store.token) {
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
						<form onSubmit={logout}>
							<button className="btn btn-primary">Logout</button>
						</form>
					</div>
				</div>
			</nav>
		);
	} else {
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
	}
};
