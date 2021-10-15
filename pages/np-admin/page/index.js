import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {getPages} from "../../../server/queries/page.queries";
import {useState} from "react";
import axios from "axios";
import {hydration} from "../../../utils/hydration";
import Layout from "../../../components/layout/Layout";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import Modal from "../../../components/bootstrap-5/modal/Modal";
import Link from 'next/link';


export async function getStaticProps(context) {

    const pages = await getPages();

    return {
        props: { pages: hydration(pages) }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [message,setMessage] = useState('');
    const [pages, setPages] = useState(props.pages);
    const [pageID,setPagesID] = useState(null);
    const [pageIndex,setPageIndex] = useState(null);

    // handle delete page
    const handleDelete = () => {
        axios.delete(`/api/page/` + pageID)
            .then(r => {
                console.log(r)
                setMessage(r.data);
                // update locally the state
                pages.splice(pageIndex, 1);
                setPageIndex(null);
                setPagesID(null);
            })

    }

    return (
        <>
        <Navbar/>
        <Layout>
            <h1>Pages</h1>
            <hr/>
            <div className="mb-5">
                <a href="/np-admin/page/add" className="btn btn-danger">add</a>
            </div>
            <hr/>
            {
                message && (
                    <Alerts
                        style={message.error ? "danger" : "success"}
                        message={message.error || message.success}
                    />
                )
            }
            <Modal
                target={"delete"}
                label={"exampleModalLabel"}
                title={"Delete"}
                btn={"delete"}
                submit={handleDelete}
            >
                are you sure?
            </Modal>
            <table className="table">
                <thead>
                    <th>#</th>
                    <th>Title</th>
                    <th>Action</th>
                </thead>
                <tbody>
                {
                    pages.map((page,index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{page.title}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={()=>{
                                        setPagesID(page._id);
                                        setPageIndex(index);
                                    }}
                                    data-bs-toggle="modal" data-bs-target="#delete"
                                >Delete</button>
                                <Link href={"/np-admin/page/"+page._id}>
                                    <a
                                        className="btn btn-success"
                                    >Update</a>
                                </Link>
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
        </Layout>

        </>
    );
}


export default Index;