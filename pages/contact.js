import React from 'react';
import {useMenuContext} from "../context/menu";
import {useEffect} from "react";


function contact(props) {

    const state = useMenuContext()
    console.log(state)

    return (
        <div>
            <h1>contact</h1>
            <p>undefined</p>
        </div>
    );
}
export default contact;