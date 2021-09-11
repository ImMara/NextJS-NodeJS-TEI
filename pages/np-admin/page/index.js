import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/admin/table/Table";
import {getPages} from "../../../server/queries/page.queries";
import {useState} from "react";
import axios from "axios";

function Index(props) {

    const [pages, setPages] = useState(props.pages);

    const handleDelete = (id, pos) => {
        axios.delete("http://localhost:3000/api/page/" + id)
            .then(r => console.log(r));
        const array = pages;
        array.splice(pos, 1);
        setPages(array);
    }

    return (
        <Navbar>
            <h1>Pages</h1>
            <div className="mb-5">
                <a href="/np-admin/page/add" className="btn btn-danger">add</a>
            </div>
            <hr/>
            {

                pages.map((page, index) => (
                    <div key={index}>
                        <h1>{page.title}</h1>
                        <div onClick={() => handleDelete(page._id, index)}>X</div>
                    </div>
                ))

            }
        </Navbar>
    );
}

Index.getInitialProps = async ({req,res}) => {
    const user = req.user;
    const pages = await getPages();
    return {pages,user};
}

export default Index;