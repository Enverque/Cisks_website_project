import React from "react";
import "./Error.css";


function Error() {
    return (
        <div className="Error">
            <img src="/img/error.png" alt="error404" />
            <h2>Oops! Page Not Found</h2>
            <a href="/" className="home-button">Go Back Home</a>
        </div>
    )
}


export default Error;

