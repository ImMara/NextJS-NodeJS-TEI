import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import axios from "axios";
import {useSettingsContext} from "../../../context/settings";
import Layout from "../../../components/layout/Layout";

function Index(props) {

    const [body,setBody] = useState();
    const setting = useSettingsContext();

    const handleChange = (event) => {
        const name = event.target.name;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setBody({...body,[name]:value});
    }

    const handleSubmit = (event) => {
        axios.patch(`/api/settings/` + setting[0]._id, body)
            .then(r  =>console.log(r));
    }

    return (
        <>
        <Navbar/>
            <Layout>
                <h1>Settings</h1>
                <hr/>
                <div className={"row"}>

                    <div className="mb-3 col-6">
                        <label htmlFor="title" className="form-label">title : </label>
                        <input className="form-control" id="title" type="text" onChange={handleChange} defaultValue={setting&&setting[0].title} name="title"/>
                    </div>

                    <div className="mb-3 col-6">
                        <label htmlFor="email" className="form-label">email</label>
                        <input className="form-control" id="email" type="email" onChange={handleChange} defaultValue={setting&&setting[0].email} name="email"/>
                    </div>

                    <div className="mb-3 col-6">
                        <label htmlFor="url" className="form-label">url</label>
                        <input className="form-control" id="url" type="text" onChange={handleChange} defaultValue={setting&&setting[0].url} name="url"/>
                    </div>

                    <div className="mb-3 d-flex align-items-center col-6">
                        <div className="mt-4">
                            <input id="comments" className="form-check-input" onChange={handleChange} type="checkbox" name="comments"/>
                            <label htmlFor="comments" className="ms-1 form-check-label"> comments </label>
                        </div>
                    </div>

                    <div className="mb-3 col-12">
                        <label htmlFor="slogan" className="form-label">slogan</label>
                        <textarea className="form-control" id="slogan" onChange={handleChange} name="slogan" defaultValue={setting&&setting[0].slogan} cols="30" rows="10"/>
                    </div>

                    <a className="btn btn-primary" onClick={handleSubmit}>Submit</a>
                </div>
            </Layout>
        </>
    );
}

export default Index;