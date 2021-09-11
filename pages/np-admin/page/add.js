import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import axios from "axios";

function Add(props) {

    const [body, setBody] = useState({
        title: "",
        date: Date.now(),
        image: "test",
        layout: "test",
        body: {}
    });

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setBody({
            ...body,
            [name]: value
        })
    }

        const handleSubmit = async () => {
            axios.post("http://localhost:3000/api/page", body)
                .then(r => console.log(r))
        }


        return (
            <Navbar>
                <label htmlFor="">
                    title
                    <input onChange={handleChange} name="title" type="text"/>
                </label>
                <label htmlFor="">
                    layout
                    <input onChange={handleChange} type="text"/>
                </label>
                <a
                   className="btn btn-primary"
                   onClick={handleSubmit}
                >add</a>
            </Navbar>
        );
}

export default Add;