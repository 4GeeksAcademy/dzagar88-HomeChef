import React, { useState, useEffect, useContext } from "react";
import { MenuItem } from "../component/menuItem.js";
import { Context } from "../store/appContext.js";
import homechefBG from "../../img/homechefBG.jpg"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from "react-router-dom";
export const Chef = () => {
    const { store, actions } = useContext(Context);
    const [menuItems, setMenuItems] = useState([]);
    const [menuItemsMap, setMenuItemsMap] = useState({});
    const [showMenuItemForm, setShowMenuItemForm] = useState(false);
    const addMenuItem = (newMenuItem) => {
        setMenuItems((prevItems) => [...prevItems, newMenuItem]);
        setMenuItemsMap((prevMap) => ({
            ...prevMap,
            [newMenuItem.id]: newMenuItem.address
        }));
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
    const [alignment, setAlignment] = React.useState('chef');
    const navigate = useNavigate();
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const handleClick = (value) => {
        console.log(`Button ${value} clicked!`);
        if (value === "home") {
            navigate("/");
        } else if (value === "diner") {
            navigate("/diner");
        } else {
            navigate("/chef");
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${homechefBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}><br />
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                className="Toggle d-flex justify-content-center"
            >
                <ToggleButton className="bg-light border" value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
                <ToggleButton className="bg-light border" value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
            </ToggleButtonGroup>
            <div className="container"><br></br>
                <h1
                    style={{ width: "85%" }}
                    className="white-title title-font opacity60 d-flex justify-content-center m-auto">Chef</h1><br></br>
                <div
                    style={{ fontSize: "20px", width: "85%" }}
                    className="white-title lower-font opacity60 m-auto p-1">Click "Add" to add a menu item:</div>
                <button
                    className="btn white-title oy-button my-2"
                    onClick={toggleMenuItemForm}>Add</button>
                {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
            </div>
            {store.menuItems.map(item => (
                <div key={item.id}>
                    <div key={item.id} className="container card title-font border border-dark"
                        style={{ width: "20rem" }}>
                        <h3>{item.title}</h3>
                        <img src={item.image} alt="Menu Item" />
                        <p><u>Description:</u> {item.description}</p>
                        <p><u>Ingredients:</u> {item.ingredients}</p>
                        <p><u>Dietary Preferences:</u> {item.dietary_preferences}</p>
                        <p><u>Allergen:</u> {item.allergen}</p>
                        <p><u>Estimated Time:</u> {item.estimated_time}</p>
                        <p><u>Quantity Available:</u> {item.quantity_available}</p>
                        <p>{menuItemsMap[item.id]}</p> {/* Render the address using the menuItemsMap */}
                        <p><u>Street:</u> {item.street}</p>
                        <p><u>City:</u> {item.city}</p>
                        <p><u>State:</u> {item.state}</p>
                    </div><br />
                </div>
            ))}
        </div>
    );
}