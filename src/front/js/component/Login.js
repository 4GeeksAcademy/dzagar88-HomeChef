import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch(process.env.BACKEND_URL + '/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				throw new Error('Invalid username or password');
			}

			const token = await response.json();
			sessionStorage.setItem('token', token);
			navigate('/main');
		} catch (error) {
			console.error(error);
		}
	};

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
