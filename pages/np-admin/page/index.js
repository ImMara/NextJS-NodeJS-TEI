import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/admin/table/Table";

function Index(props) {
    return (
        <Navbar>
            <h1>Pages</h1>
            <div className="mb-5">

            </div>
            <hr/>
            <Table/>
        </Navbar>
    );
}

export default Index;