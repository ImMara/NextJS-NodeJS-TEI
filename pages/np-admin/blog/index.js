import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/admin/table/Table";

function Index(props) {
    return (
        <Navbar>
            <h1>Blog</h1>
            <Table/>
        </Navbar>
    );
}

export default Index;