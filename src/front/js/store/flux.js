const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: undefined,
			menuItems: [],
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
			checkForToken() {
				if (!localStorage.getItem("token")) return
				const actions = getActions()
				console.log(localStorage.getItem("token"))
				actions.setToken(localStorage.getItem("token"))
			},
			getMenuItems() {
				const store = getStore()
				fetch(process.env.BACKEND_URL + '/api/chef', {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
				})
					.then(response => {
						console.log(response.ok); // will be true if the response is successfull
						console.log(response.status); // the status code = 200 or code = 400 etc.
						if (response.ok != true) throw new Error("response is not ok", response.status);
						return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(menuItems => {
						setStore({
							menuItems: menuItems
						})
						//here is were your code should start after the fetch finishes
						return menuItems;
						console.log(menuItems); //this will print on the console the exact object received from the server
					})
					.catch(error => {
						//error handling
						console.log(error);
					})
			}
		}
	};
};

export default getState;
