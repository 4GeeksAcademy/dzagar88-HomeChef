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

    useEffect(() => {
        if (!store.token) return
        actions.getMenuItems()
    }, [store.token]);

    useEffect(() => {
        actions.getMenuItems()
    }, [])

    return (
        <div>
            <button onClick={toggleMenuItemForm}>Add</button>
            {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
            <div>
                {store.menuItems.map(item => (
                    <div key={item.id} className="card">
                        <h3>{item.title}</h3>
                        <img src={item.image} alt="Menu Item" />
                        <p>{item.description}</p>
                        <p>{item.ingredients}</p>
                        <p>{item.dietary_preferences}</p>
                        <p>{item.allergen}</p>
                        <p>{item.estimated_time}</p>
                        <p>{item.quantity_available}</p>
                        <p>{item.street}</p>
                        <p>{item.city}</p>
                        <p>{item.state}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}