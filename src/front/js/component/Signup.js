import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import signup2 from "../../img/signup2.png"

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
		<div className="text-center m-5">
			<form onSubmit={handleSubmit}>
				<input
					className="mx-1 my-2"
					placeholder="Username"
					value={username}
					onChange={handleUsernameChange}
				></input>
				<input
					className="mx-1 my-2"
					placeholder="Password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
				></input>
				<button className="btn btn-success mx-1" type="submit">
					{"Submit"}
				</button>
			</form>
			<div>
				<img src={signup2} />
			</div>
		</div>
	);
};
