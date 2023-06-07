import React, { useState } from "react";
import { MenuItem } from "../component/menuItem.js";
import homechefBG from "../../img/homechefBG.jpg"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from "react-router-dom";


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

    const toggleButton = () => {
        if (alignment === 'home') {
            return <Home />;
        } else if (alignment === 'diner') {
            return <Diner />;
        } else {
            return <Chef />;
        }
    };





    return (
        <div style={{
            backgroundImage: `url(${homechefBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "783px"
        }}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                className="Toggle margin16"
            >
                {/* <ToggleButton className="bg-light border" value="home" onClick={() => handleClick('home')}>Home</ToggleButton> */}
                <ToggleButton className="bg-light border" value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
                <ToggleButton className="bg-light border" value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
            </ToggleButtonGroup>
            <div className="container"><br></br>
                <h1 style={{ width: "12%" }}
                    className="white-title title-font opacity60 d-flex justify-content-center">Chef</h1><br></br>
                <div style={{ width: "28%", fontSize: "25px" }} className="white-title lower-font opacity60">Click "Add" to add a menu item:</div>
                <button
                    className="btn white-title oy-button my-2"
                    onClick={toggleMenuItemForm}>Add</button>
                {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
            </div>
        </div>
    );
}