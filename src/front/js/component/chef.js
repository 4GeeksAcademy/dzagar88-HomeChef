import React, { useState } from "react";
import { MenuItem } from "../component/menuItem.js";

export const Chef = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showMenuItemForm, setShowMenuItemForm] = useState(false);

    const addMenuItem = (newMenuItem) => {
        setMenuItems((prevItems) => [...prevItems, newMenuItem]);
        setShowMenuItemForm(false);
    };

    const toggleMenuItemForm = () => {
        setShowMenuItemForm(!showMenuItemForm);
    };

    return (
        <div>
            <button onClick={toggleMenuItemForm}>Add</button>
            {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
        </div>
    );
}