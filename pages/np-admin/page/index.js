import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/admin/table/Table";
import {getPages} from "../../../server/queries/page.queries";
import {useState} from "react";
import axios from "axios";
import {getPosts} from "../../../server/queries/post.queries";
import {hydration} from "../../../utils/hydration";
import Layout from "../../../components/admin/layout/Layout";


export async function getStaticProps(context) {

    const pages = await getPages();

    return {
        props: { pages: hydration(pages) }, // will be passed to the page component as props
    }
}

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
        <>
        <Navbar/>
        <Layout>
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
        </Layout>

        </>
    );
}


export default Index;