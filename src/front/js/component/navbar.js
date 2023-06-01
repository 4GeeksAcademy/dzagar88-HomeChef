import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const handleLogout = async () => {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				localStorage.removeItem('token');
				window.location.href = '/login';
			} else {
				console.error('Logout request failed');
			}
		} catch (error) {
			console.error(error);
		}
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
						<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
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
