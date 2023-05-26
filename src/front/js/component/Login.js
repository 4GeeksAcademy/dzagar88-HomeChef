import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { store, actions } = useContext(Context)

	useEffect(() => {
		// check if there is token, then show nav bar we want; if not, then show log in page
		if (sessionStorage.getItem("token")) {
			navigate("/main")
		}
	}, [sessionStorage.getItem("token")]);

	const handleSubmit = () => {
		actions.login(username, password)
	}

	return (
		<form className="text-center m-5" onSubmit={handleSubmit}>
			<label className="mx-2">
				Username:
				<input className="mx-1" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
			</label>
			<label>
				Password:
				<input className="mx-1" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
			</label>
			<button type="submit">Log In</button>
		</form>
	);
}
