import React, { useState, useEffect, useContext } from "react";
import { MenuItem } from "../component/menuItem.js";
import { Context } from "../store/appContext.js";

export const Chef = () => {
    const { store, actions } = useContext(Context);
    const [menuItems, setMenuItems] = useState([]);
    const [showMenuItemForm, setShowMenuItemForm] = useState(false);

    const addMenuItem = (newMenuItem) => {
        setMenuItems((prevItems) => [...prevItems, newMenuItem]);
        setShowMenuItemForm(false);
    };

    const toggleMenuItemForm = () => {
        setShowMenuItemForm(!showMenuItemForm);
    };

    function getMenuItems() {
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
                //here is were your code should start after the fetch finishes
                setMenuItems(menuItems);
                console.log(menuItems); //this will print on the console the exact object received from the server
            })
            .catch(error => {
                //error handling
                console.log(error);
            })
    }

    useEffect(() => {
        if (!store.token) return
        getMenuItems()
    }, [store.token]);

    return (
        <div>
            <button onClick={toggleMenuItemForm}>Add</button>
            {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
            <div>
                {menuItems.map(item => (
                    <div key={item.id} className="card">
                        <h3>{item.title}</h3>
                        <img src={item.image} alt="Menu Item" />
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}