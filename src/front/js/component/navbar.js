import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">HomeChef</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">{"Click Here to Sign Up!"}</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary mx-2">{"Login"}</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
