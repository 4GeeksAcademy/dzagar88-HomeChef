const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: undefined,
			menuItem: []
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
			},
			addMenuItem: (newMenuItem) => {
				console.log("menu item", newMenuItem)
				let store = getStore()
				fetch(process.env.BACKEND_URL + '/api/chef', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newMenuItem)
				})
					.then(response => response.json())
					.then(info => setStore({ menuItem: info }))
					.catch(error => console.log(error))
			},
		}
	};
};

export default getState;
