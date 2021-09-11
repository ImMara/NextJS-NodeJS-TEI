import React from 'react';
import Table from "../../../components/admin/table/Table";
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import {getSettings} from "../../../server/queries/settings.queries";
import axios from "axios";

function Index(props) {

    const [body,setBody] = useState();
    const [setting,setSetting] = useState(props.settings);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setBody({...body,[name]:value});
    }

    const handleSubmit = (event) => {
        axios.patch("http://localhost:3000/api/settings/" + setting[0]._id, body)
            .then(r  =>console.log(r));
    }

    return (
        <Navbar>
            <h1>Params</h1>
            <form action="">
                <label htmlFor="">
                    title
                    <input type="text" onChange={handleChange} defaultValue={setting[0].title} name="title"/>
                </label>
                <label htmlFor="">
                    email
                    <input type="email" onChange={handleChange} defaultValue={setting[0].email} name="email"/>
                </label>
                <label htmlFor="">
                    url
                    <input type="text" onChange={handleChange} defaultValue={setting[0].url} name="url"/>
                </label>
                <label htmlFor="">
                    role
                    <select name="defaultRoles" defaultValue={setting[0].role}>
                        <option onChange={handleChange} value="role_admin">Admin</option>
                    </select>
                </label>
                <label htmlFor="">
                    slogan
                    <textarea onChange={handleChange} name="slogan" defaultValue={setting[0].slogan} cols="30" rows="10"/>
                </label>
                <label htmlFor="">
                    comments
                    {
                        setting[0].comments ?
                        (
                            <input onChange={handleChange} checked={true} type="checkbox"  name="comments"/>
                        ) : (
                            <input onChange={handleChange} checked={false}  type="checkbox" name="comments"/>
                        )
                    }
                </label>
                <a className="btn btn-primary" onClick={handleSubmit}>Submit</a>
            </form>
        </Navbar>
    );
}

Index.getInitialProps = async ({req,res}) => {
    const settings = await getSettings();
    return {settings};
}

export default Index;