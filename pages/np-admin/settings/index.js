import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import axios from "axios";
import {useSettingsContext} from "../../../context/settings";
import Layout from "../../../components/layout/Layout";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";

function Index(props) {

    const [body,setBody] = useState();
    const setting = useSettingsContext();
    const [message,setMessage] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setBody({...body,[name]:value});
    }

    const handleSubmit = (event) => {
        axios.patch(`/api/settings/` + setting[0]._id, body)
            .then(r  =>setMessage(r.data));
    }

    return (
        <>
        <Navbar/>
            <Layout>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <h1>Paramètres</h1>
                <hr/>
                <div className={"row"}>

                    <div className="mb-3 col-6">
                        <label htmlFor="title" className="form-label">Titre</label>
                        <input className="form-control" id="title" type="text" onChange={handleChange} defaultValue={setting&&setting[0].title} name="title"/>
                    </div>

                    <div className="mb-3 col-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="form-control" id="email" type="email" onChange={handleChange} defaultValue={setting&&setting[0].email} name="email"/>
                    </div>

                    <div className="mb-3 col-6">
                        <label htmlFor="url" className="form-label">URl</label>
                        <input className="form-control" id="url" type="text" onChange={handleChange} defaultValue={setting&&setting[0].url} name="url"/>
                    </div>

                    <div className="mb-3 d-flex align-items-center col-6">
                        <div className="mt-4">
                            <input id="comments" className="form-check-input" onChange={handleChange} defaultValue={setting&&setting[0].comments} type="checkbox" name="comments"/>
                            <label htmlFor="comments" className="ms-1 form-check-label">Commentaire</label>
                        </div>
                    </div>

                    <div className="mb-3 col-12">
                        <label htmlFor="slogan" className="form-label">Slogan</label>
                        <textarea className="form-control" id="slogan" onChange={handleChange} name="slogan" defaultValue={setting&&setting[0].slogan} cols="30" rows="10"/>
                    </div>

                    <a className="btn btn-primary" onClick={handleSubmit}>Modifier</a>
                </div>
            </Layout>
        </>
    );
}

export default Index;