import React, {useState} from 'react';
import {hydration} from "../../../../../utils/hydration";
import { getCommentsPost } from "../../../../../server/queries/comments.queries";
import Layout from "../../../../../components/layout/Layout";
import Navbar from "../../../../../components/admin/navbar/Navbar";
import Link from "next/link";
import {truncateString} from "../../../../../utils/functions";
import Modal from "../../../../../components/bootstrap-5/modal/Modal";
import Alerts from "../../../../../components/bootstrap-5/alerts/Alerts";
import axios from "axios";

export async function getServerSideProps(context) {

    // id from url
    const id = context.params.id;
    // comments from db with id
    const comments = await getCommentsPost(id);

    // create props
    return {
        props: { comments: hydration(comments) }
    }

}

function Index(props) {

    const [comments,setComments] = useState(props.comments);
    const [id,setId] = useState(null);
    const [index,setIndex] = useState(null);
    const [message,setMessage] = useState("");

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
                <div className="row gy-0 gx-0">
                    {
                        message && (
                            <Alerts
                                style={message.error ? "danger" : "success"}
                                message={message.error || message.success}
                            />
                        )
                    }
                    <div className="col-12">
                        <h1>Comments</h1>
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
                        title={"delete post"}
                        btn={"delete"}
                        submit={handleDelete}
                    >are you sure?</Modal>
                    <div className="col-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Comment</th>
                                <th>post title</th>
                                <th>date</th>
                                <th>username</th>
                                <th>email</th>
                                <th>actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                comments.map((comment,index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{truncateString(comment.body,15)}</td>
                                        <td>{comment.post_id.title}</td>
                                        <td>{comment.date}</td>
                                        <td>{comment.username}</td>
                                        <td>{comment.email}</td>
                                        <td>
                                            <Link href={"/np-admin/blog/comments/"+comment._id}>
                                                <a className={"btn btn-primary"}>Voir</a>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger rounded-end rounded-0 px-3"
                                                data-bs-toggle="modal"
                                                onClick={() => handleBtn(comment._id, index)}
                                                data-bs-target="#delete-post">
                                                delete
                                            </button>
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