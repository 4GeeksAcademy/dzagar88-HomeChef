import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { DinerMenuItem } from "../component/dinerMenuItem.js";

export const MenuList = ({ menuItems, onMenuItemClick }) => {
    return (
        <div className="menu-list">
            {menuItems.map((menuItem) => (
                <DinerMenuItem
                    key={menuItem.id}
                    menuItem={menuItem}
                    onMenuItemClick={onMenuItemClick}
                />
            ))}
        </div>
    );
};
