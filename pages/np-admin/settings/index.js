import React, {useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import axios from "axios";
import {useSettingsContext} from "../../../context/settings";
import Layout from "../../../components/layout/Layout";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import {hydration} from "../../../utils/hydration";
import {getSettings} from "../../../server/queries/settings.queries";

export async function getStaticProps(context) {
    // get all CategoriesWidget from db
    const settings = await getSettings();

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {setting: hydration(settings)}, // will be passed to the page component as props
    }
}

function Index(props) {
    const setting = useSettingsContext();
    const [body, setBody] = useState(...props.setting);
    const [message, setMessage] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setBody({...body, [name]: value});
    }

    const handleSubmit = (event) => {
        axios.patch(`/api/settings/` + setting[0]._id, body)
            .then(r => setMessage(r.data));
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

                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="title" className="form-label">Titre</label>
                        <input className="form-control" id="title" type="text" onChange={handleChange}
                               value={body.title} name="title"/>
                    </div>

                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="form-control" id="email" type="email" onChange={handleChange}
                               value={body.email} name="email"/>
                    </div>

                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="url" className="form-label">URL</label>
                        <input className="form-control" id="url" type="text" onChange={handleChange} value={body.url}
                               name="url"/>
                    </div>

                    <div className="mb-3 d-flex align-items-center col-12 col-md-6">
                        <div className="mt-4">
                            <input id="comments" className="form-check-input" onChange={handleChange} type="checkbox"
                                   checked={body.comments} name="comments"/>
                            <label htmlFor="comments" className="ms-1 form-check-label">Commentaire</label>
                        </div>
                    </div>

                    <div className="mb-3 col-12 col-md-6">
                        <label htmlFor="slogan" className="form-label">Slogan</label>
                        <textarea className="form-control" id="slogan" onChange={handleChange} name="slogan"
                                  defaultValue={setting && setting[0].slogan} cols="30" rows="10"/>
                    </div>
                    <div className="col-12 row gy-0 gx-2">
                        <div className="col-12 col-md-2">
                            <a className="btn btn-primary w-100" onClick={handleSubmit}>Modifier</a>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Index;