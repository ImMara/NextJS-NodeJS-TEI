import React from 'react';
import Table from "../../../components/admin/table/Table";
import Navbar from "../../../components/admin/navbar/Navbar";

function Index(props) {
    return (
        <Navbar>
            <h1>Params</h1>
            <Table/>
        </Navbar>
    );
}

export default Index;