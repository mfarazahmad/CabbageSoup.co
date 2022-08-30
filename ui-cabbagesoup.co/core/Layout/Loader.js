import React from 'react';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";


function Loader() {
    return (
        <div className="loader">  
            <PacmanLoader
                className="icon"
                size={50}
                color={"white"}
                loading={true}
            />
            <div className="color"></div>
        </div>
    );
}

export default Loader;