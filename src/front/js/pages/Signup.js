import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import signup2 from "../../img/signup2.png"
import homechefBG from "../../img/homechefBG.jpg"

export const Signup = () => {
	const { store, actions } = useContext(Context);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			username: username,
			password: password,
		};

		fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	};

	return (
		<div style={{
			backgroundImage: `url(${homechefBG})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			height: "783px"
		}} className="d-flex justify-content-center p-5">
			<div className="position-absolute top-50 start-50 translate-middle">
				<h2 className="white-title title-font opacity60">Enter a unique username<br></br>and password to sign up:</h2>
				<form className="opacity60 d-flex justify-content-center" onSubmit={handleSubmit}>
					<input
						className="m-2"
						placeholder="Username"
						value={username}
						onChange={handleUsernameChange}
					></input>
					<input
						className="m-2"
						placeholder="Password"
						type="password"
						value={password}
						onChange={handlePasswordChange}
					></input>
					<button className="btn white-title oy-button m-2" type="submit">
						{"Submit"}
					</button>
				</form>
			</div>
		</div>
	);
};
