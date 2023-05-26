const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: undefined
		},
		actions: {
			login: (username, password) => {
				console.log("credentials", { "username": username, "password": password })
				fetch(process.env.BACKEND_URL + '/api/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username: username, password: password })
				})
					.then(response => response.json())
					.then(token => {
						localStorage.setItem('token', token)
						setStore({
							token: token
						})
						console.log(token)
					})
					.catch(error => console.log(error))
			},
			setToken(token) {
				setStore({
					token: token
				})
			}
		}
	};
};

export default getState;
