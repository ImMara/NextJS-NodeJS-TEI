import React, {useState} from 'react';
import axios from "axios";
import Layout from "../../components/layout/Layout";

export const getServerSideProps = async ({req,res})=>{
    const user = req.user;

    if (user) {
        return {
            redirect: {
                destination: 'np-admin/dashboard',
                permanent: false,
            },
        }
    }

    return { props:{} };
}

function Index(props) {

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center h-100" style={{minHeight:"100vh"}}>
                <div className="w-50">
                    <Layout>
                        <div>
                            <h1>Login</h1>
                            <hr/>
                        </div>
                        <div className={"mb-3"}>
                            <form method="post" action="/api/auth/login">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="email"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input type="password" name="password" className="form-control" id="password"/>
                                </div>
                                <button className={"btn btn-primary"}>Envoyer</button>
                            </form>
                        </div>
                    </Layout>
                </div>
            </div>
        </div>
    );
}


export default Index;