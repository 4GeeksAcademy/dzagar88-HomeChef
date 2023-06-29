import React from "react";
import PayPal from "./paypalint.js";

export const DinerMenuItem = ({ menuItem }) => {
    return (
        <div>
            <div className="container card title-font border border-dark my-3" style={{ width: "20rem" }}>
                <h3>{menuItem.title}</h3>
                <img src={menuItem.image} alt="Menu Item" />
                <p><strong><u>Description:</u></strong> {menuItem.description}</p>
                <p><strong><u>Ingredients:</u></strong> {menuItem.ingredients}</p>
                <p><strong><u>Dietary Preferences:</u></strong> {menuItem.dietary_preferences}</p>
                <p><strong><u>Allergen:</u></strong> {menuItem.allergen}</p>
                <p><strong><u>Estimated Time:</u></strong> {menuItem.estimated_time}</p>
                <p><strong><u>Quantity Available:</u></strong> {menuItem.quantity_available}</p>
                <p><strong><u>Street:</u></strong> {menuItem.street}</p>
                <p><strong><u>City:</u></strong> {menuItem.city}</p>
                <p><strong><u>State:</u></strong> {menuItem.state}</p>
                <p><strong><u>Price:</u></strong> {menuItem.price}</p>
                <PayPal />
            </div><br />
        </div>
    );
}
