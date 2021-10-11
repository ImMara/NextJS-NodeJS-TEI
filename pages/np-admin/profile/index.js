import React, {useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Layout from "../../../components/layout/Layout";
import {useAuthContext} from "../../../context/auth";

function Index(props) {

    const [user,setUser] = useState(useAuthContext())

    return (
        <>
            <Navbar/>
            <Layout>
                <div className="row">
                    <div className="col-12">
                        <h1>Profile</h1>
                    </div>
                    <div className="col-6">
                        <input type="text" value={user.username} />
                    </div>
                    <div className="col-6">

                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Index;