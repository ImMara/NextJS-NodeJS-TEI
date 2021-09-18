import React from 'react';
import Navbar from "../../components/admin/navbar/Navbar";
import Layout from "../../components/admin/layout/Layout";

function Dashboard(props) {
    return (
        <>
            <Navbar/>
            <Layout>
                <h1>dashboard</h1>
            </Layout>
        </>
    );
}

export default Dashboard;