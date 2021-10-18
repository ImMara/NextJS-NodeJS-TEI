import React, {useState} from 'react';
import {getComment, getCommentsPost} from "../../../../../server/queries/comments.queries";
import {hydration} from "../../../../../utils/hydration";
import Layout from "../../../../../components/layout/Layout";
import Navbar from "../../../../../components/admin/navbar/Navbar";
import Link from "next/link";
import axios from "axios";
import Alerts from "../../../../../components/bootstrap-5/alerts/Alerts";
import Modal from "../../../../../components/bootstrap-5/modal/Modal";

export async function getServerSideProps(context) {

    // id from url
    const id = context.params.id;
    // comments from db with id
    const comment = await getComment(id);

    // create props
    return {
        props: { comment: hydration(comment) }
    }
}

function Index(props) {

    const [id,setId] = useState();
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState(props.comment);

    const handleBtn = () =>{
        setId(comment._id);
    }

    const handleDelete = () => {
        axios
            .delete('/api/blog/comments/' + id )
            .then(r => {
                setComment({})
                setMessage(r.data);
            })
    }

    return (
        <>
            <Navbar/>
            <Layout>
                <div className="row gy-0 gx-0">
                    {
                        message && (
                            <>
                            <Alerts
                                style={message.error ? "danger" : "success"}
                                message={message.error || message.success}
                            />
                            <div className="col-12 row">
                                <Link href={"/np-admin/blog"}>
                                    <a className={"btn btn-primary col-4 me-2"}>return to blog</a>
                                </Link>
                                <Link href={"/np-admin/blog/comments"}>
                                    <a className={"btn btn-primary col-4"}>return to comments</a>
                                </Link>
                            </div>
                            </>
                        )
                    }
                    <Modal
                        target={"delete-post"}
                        label={"exampleModalLabel"}
                        title={"delete post"}
                        btn={"delete"}
                        submit={handleDelete}
                    >are you sure?</Modal>
                    {
                        !message && !message.success && (
                            <>
                                <div className="col-12">
                                    <h1>Commentaire</h1>
                                    <hr/>
                                </div>
                                <div className="col-12 row gy-0 gx-0">
                                    <div className="col-4 mb-3">
                                        <Link href={"/np-admin/blog/"}>
                                            <a className="btn btn-primary">Retour</a>
                                        </Link>
                                    </div>
                                    <hr/>
                                </div>
                                <div className="col-12">
                                    <div>
                                        <div className="mb-2">
                                            <h5 className="m-0">{comment.username}</h5>
                                            <span className="me-3 small">{comment.date.substr(0,10)}</span>
                                        </div>
                                        <p>
                                            {comment.body}
                                        </p>
                                    </div>
                                    <hr/>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-danger rounded-end rounded-0 px-3"
                                            data-bs-toggle="modal"
                                            onClick={handleBtn}
                                            data-bs-target="#delete-post">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </Layout>
        </>
    );
}

export default Index;