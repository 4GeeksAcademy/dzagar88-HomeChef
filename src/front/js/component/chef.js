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
            // height: "930px"
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
                    style={{ width: "27%" }}
                    className="white-title title-font opacity60 d-flex justify-content-center m-auto shadow1">Chef</h1><br></br>
                <div
                    style={{ fontSize: "20px", width: "85%" }}
                    className="white-title title-font opacity60 m-auto p-1 d-flex justify-content-center shadow1">Click "Add" to add a menu item:</div>
                <div className="d-flex justify-content-center">
                    <div>
                        <button
                            className="container btn white-title oy-button my-2 shadow1 title-font"
                            onClick={toggleMenuItemForm}>Add</button>
                        {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
                    </div>
                </div>

            </div>
            {store.menuItems.map(item => (
                <div key={item.id}>
                    <div key={item.id} className="container card title-font border border-dark"
                        style={{ width: "20rem" }}>
                        <h3>{item.title}</h3>
                        <img src={item.image} alt="Menu Item" />
                        <p><strong><u>Description:</u></strong> {item.description}</p>
                        <p><strong><u>Ingredients:</u></strong> {item.ingredients}</p>
                        <p><strong><u>Dietary Preferences:</u></strong> {item.dietary_preferences}</p>
                        <p><strong><u>Allergen:</u></strong> {item.allergen}</p>
                        <p><strong><u>Estimated Time:</u></strong> {item.estimated_time}</p>
                        <p><strong><u>Quantity Available:</u></strong> {item.quantity_available}</p>
                        <p>{menuItemsMap[item.id]}</p> {/* Render the address using the menuItemsMap */}
                        <p><strong><u>Street:</u></strong> {item.street}</p>
                        <p><strong><u>City:</u></strong> {item.city}</p>
                        <p><strong><u>State:</u></strong> {item.state}</p>
                    </div><br />
                </div>
            ))
            }
        </div >
    );
}