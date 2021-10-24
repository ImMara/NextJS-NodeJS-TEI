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


export async function getServerSideProps(context) {

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
            <div className="mb-3">
                <a href="/np-admin/page/add" className="btn btn-primary">Ajouter une page</a>
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
                title={"Supprimer une page"}
                btn={"Supprimer"}
                submit={handleDelete}
            >
                Êtes-vous sûr?
            </Modal>
            <table className="table">
                <thead>
                    <th>#</th>
                    <th>Titre</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                {
                    pages.map((page,index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{page.title}</td>
                            <td>
                                <div className="row gx-1 gy-1">
                                    <div className="col-12 col-lg-3">
                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={()=>{
                                                setPagesID(page._id);
                                                setPageIndex(index);
                                            }}
                                            data-bs-toggle="modal" data-bs-target="#delete"
                                        >Supprimer</button>
                                    </div>
                                    <div className="col-12 col-lg-3">
                                            <a
                                                href={"/np-admin/page/"+page._id}
                                                className="btn btn-success w-100"
                                            >Modifier</a>
                                    </div>
                                </div>
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