import React, {useState} from 'react';
import axios from "axios";

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
            <form method="post" action="/api/auth/login">
                <div className="mb-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className="form-control" id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password"/>
                </div>
                <button className={"btn btn-primary"}>submit</button>
            </form>
        </div>
    );
}


export default Index;