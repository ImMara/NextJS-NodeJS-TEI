import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import axios from "axios";
import Input from "../../../components/bootstrap-5/input/Input";

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
        axios
            .post("http://localhost:3000/api/page", body)
            .then(r => console.log(r))
    }

    return (
        <Navbar>

            <Input
                name={"title"}
                type={"text"}
                onChange={handleChange}
            />

            <Input
                name={"layout"}
                type={"text"}
                onChange={handleChange}
            />

            <a
                className="btn btn-primary"
                onClick={handleSubmit}
            >add</a>

        </Navbar>
    );

}

export default Add;