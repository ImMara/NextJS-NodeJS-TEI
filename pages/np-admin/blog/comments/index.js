import React, {useState} from 'react';
import {getComments} from "../../../../server/queries/comments.queries";
import {hydration} from "../../../../utils/hydration";
import Layout from "../../../../components/layout/Layout";
import Navbar from "../../../../components/admin/navbar/Navbar";
import Link from 'next/link';
import {truncateString} from "../../../../utils/functions";
import axios from "axios";
import Modal from "../../../../components/bootstrap-5/modal/Modal";
import Alerts from "../../../../components/bootstrap-5/alerts/Alerts";

export async function getStaticProps(context) {

    // comments from db
    const comments = await getComments();

    // create props
    return {
        props: { comments: hydration(comments) }
    }
}

function Index(props) {

    const [comments,setComments]= useState(props.comments);
    const [index,setIndex] = useState(null);
    const [message,setMessage] = useState("");
    const [id,setId] = useState(null);

    const handleBtn = (id,index) =>{
        setId(id);
        setIndex(index);
    }

    const handleDelete = (event) =>{
        axios
            .delete('/api/blog/comments/'+id)
            .then(r =>{
                comments.splice(index,1);
                setMessage(r.data);
            })
    }

    return (
        <>
            <Navbar/>
            <Layout>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <div className="row gy-0 gx-0">
                    <div className="col-12">
                        <h1>Commentaires</h1>
                        <hr/>
                    </div>
                    <div className="col-12 row gy-0 gx-0">
                        <div className="col-4 mb-3">
                            <Link href={"/np-admin/blog/"}>
                                <a className="btn btn-primary">Return</a>
                            </Link>
                        </div>
                        <hr/>
                    </div>
                    <Modal
                        target={"delete-post"}
                        label={"exampleModalLabel"}
                        title={"Supprimer le commentaire"}
                        btn={"Supprimer"}
                        submit={handleDelete}
                    >Êtes-vous sûr ?</Modal>
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Commentaire</th>
                                    <th className={"table-none"}>Titre de l'article</th>
                                    <th className={"table-none"}>Date</th>
                                    <th className={"table-none"}>Utilisateur</th>
                                    <th className={"table-none"}>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comments.map((comment,index) => (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{truncateString(comment.body,15)}</td>
                                            <td className={"table-none"}>{comment.post_id &&( comment.post_id.title ) }</td>
                                            <td className={"table-none"}>{comment.date.substr(0,10)}</td>
                                            <td className={"table-none"}>{comment.username}</td>
                                            <td className={"table-none"}>{comment.email}</td>
                                            <td>
                                                <div className="row gy-1 gx-1">
                                                    <div className="col-12 col-xxl-8">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger w-100 px-3"
                                                            data-bs-toggle="modal"
                                                            onClick={() => handleBtn(comment._id, index)}
                                                            data-bs-target="#delete-post">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                    <div className="col-12 col-xxl-4">
                                                        <Link href={"/np-admin/blog/comments/"+comment._id}>
                                                            <a className={"btn btn-primary w-100"}>Voir</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </Layout>
        </>
    );
}

export default Index;