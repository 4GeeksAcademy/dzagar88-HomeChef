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
			<nav className="border border-dark navbar navbar-dark brown-bg">
				<div className="container">
					<Link to="/home">
						<span className="navbar-brand mb-0 h1 title-font">HomeChef</span>
					</Link>
					<div className="ml-auto d-flex justify-content-center">
						<Link to="">
							<button className="btn white-title oy-button mx-2">{"Profile"}</button>
						</Link>
						<form onSubmit={logout}>
							<button className="btn white-title oy-button">Logout</button>
						</form>
					</div>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="border border-dark navbar navbar-light brown-bg">
				<div className="container">
					<Link to="/home">
						<span className="navbar-brand mb-0 h1 title-font white-title">HomeChef</span>
					</Link>
					<div className="ml-auto">
						<Link to="/signup">
							<button className="btn white-title oy-button">{"Sign Up"}</button>
						</Link>
						<Link to="/login">
							<button className="btn white-title oy-button mx-2">{"Login"}</button>
						</Link>
					</div>
				</div>
			</nav>
		);
	}
};
