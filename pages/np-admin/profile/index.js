import React, {useEffect, useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Layout from "../../../components/layout/Layout";
import {hydration} from "../../../utils/hydration";
import Input from "../../../components/bootstrap-5/input/Input";
import Textarea from "../../../components/bootstrap-5/input/Textarea";
import axios from "axios";

export async function getServerSideProps(context) {

    const user = context.req.user;

    return {
        props: { user:hydration(user) }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [user,setUser] = useState({});
    const [message,setMessage] = useState("");

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({...user,[name]:value})
    }

    const handleSubmit = (event) => {
        axios
            .patch(`/api/users/`+props.user._id,user)
            .then(r => {
                console.log(r)
                setMessage(r.data);
            });
    }

    return (
        <>
            <Navbar/>
            <Layout>
                <div className="row mb-3 mt-1">
                    <div className="col-12 mb-2">
                        <h1>Profile</h1>
                        <hr/>
                    </div>
                    <div className="col-12 col-lg-6">
                       <Input
                           label={"votre pseudo"}
                           type="text"
                           name="username"
                           defaultValue={props.user.username}
                           placeholder="votre pseudo"
                           required={true}
                           onChange={handleChange}
                       />
                       <Input
                            label={"votre nom"}
                            type="text"
                            name={"first_name"}
                            defaultValue={props.user.first_name}
                            placeholder="votre nom"
                            onChange={handleChange}
                       />
                       <Input
                            type="text"
                            label={"votre prenom"}
                            name={"last_name"}
                            defaultValue={props.user.last_name}
                            placeholder="votre prenom"
                            onChange={handleChange}
                       />
                        <Input
                            type="text"
                            label={"votre site"}
                            name={"website"}
                            defaultValue={props.user.website}
                            placeholder="votre site"
                            onChange={handleChange}
                        />
                        <Input
                            name="address"
                            label={"votre adresse"}
                            defaultValue={props.user.address}
                            placeholder="votre adresse"
                            onChange={handleChange}
                        />
                        <Input
                            name="postalCode"
                            label={"votre postal code"}
                            defaultValue={props.user.postalCode}
                            placeholder="votre postal code"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <Input
                            label={"votre email"}
                            type="email"
                            name="email"
                            defaultValue={props.user.local.email}
                            placeholder="votre email"
                            required={true}
                            onChange={handleChange}
                        />
                        <Input
                            label={"votre password"}
                            name={"password"}
                            type="password"
                            onChange={handleChange}
                        />
                        <Textarea
                            defaultValue={props.user.description}
                            label="description"
                            name="description"
                            row="12"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 py-3">
                        <a className="btn btn-primary" onClick={handleSubmit}>update</a>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Index;