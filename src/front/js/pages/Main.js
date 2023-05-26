import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
	let navigate = useNavigate()
    // useEffect(() => {
    //     // check if there is token, then show nav bar we want; if not, then show log in page
    //     if (sessionStorage.getItem("token") == null){
    //         navigate("/login")
    //     }
    // }, []);

    return (
        <div className="container">
            <h1>Hello</h1>
        </div>
	
	);
};
