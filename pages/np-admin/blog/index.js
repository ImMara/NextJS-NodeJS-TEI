import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {getPosts} from "../../../server/queries/post.queries";
import Modal from "../../../components/bootstrap-5/modal/Modal";
import Link from 'next/link';
import {useState} from "react";
import {hydration} from "../../../utils/hydration";
import axios from "axios";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import Layout from "../../../components/layout/Layout";

export async function getStaticProps(context) {

    // db call to get all posts
    const posts = await getPosts();

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {posts: hydration(posts)}, // will be passed to the page component as props
    }
}

function Index(props) {

    /* START STATE */

    const [posts, setPosts] = useState(props.posts);
    const [id, setId] = useState("");
    const [index, setIndex] = useState("");
    const [message, setMessage] = useState("");

    /* END STATE */

    /* START LOGIC */

    // when clicked put index and id into appropriate state
    const handleBtn = (id, index) => {
        setId(id);
        setIndex(index);
    }

    // handle the delete of the post in the db
    const handleSubmit = () => {

        axios
            .delete(`/api/blog/post/` + id)
            .then(r => {
                // delete locally
                posts.splice(index, 1)
                // set message
                setMessage(r.data);
            })
    }

    /* END LOGIC*/

    /* RENDER HTML */

    const topBar = () => {
        return (
            <>
                <div className="row">
                    <div className="col-12 row">
                        <div className="col-12 col-md-4 mb-1">
                            <a  href={"/np-admin/blog/add"} className="btn btn-primary w-100">Ajouter un article</a>
                        </div>
                        <div className="col-12 col-md-4 mb-1">
                            <Link href={"/np-admin/blog/category"}>
                                <a className="btn btn-primary mx-md-2 w-100">Ajouter une categorie</a>
                            </Link>
                        </div>
                        <div className="col-12 col-md-4 mb-1">
                            <Link href={"/np-admin/blog/comments"}>
                                <a className="btn btn-primary mx-md-2 w-100">Voir tous les commentaires</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const table = () => {
        return (
            <div className="table-responsive bg-light rounded p-2">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th scope="col">Titre</th>
                        <th scope="col" className={"table-none"}>Commentaire</th>
                        <th scope="col" className={"table-none"}></th>
                        <th scope="col" className={"table-none"}>Publié</th>
                        <th scope="col" className={"table-none"}>Categorie</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        posts.map((post, index) => (
                            <tr>
                                <td scope="row">{index}</td>
                                <td>{post.title}</td>
                                <td className={"table-none"}>{post.allowComment.toString()}</td>
                                <td className={"table-none"}>
                                    <Link href={"/np-admin/blog/" + post._id+"/comments"}>
                                        <a className={"btn btn-primary"}>Commentaires</a>
                                    </Link>
                                </td>
                                <td className={"table-none"}>{post.status.toString()}</td>
                                <td className={"table-none"}>{post.category && post.category.title}</td>
                                <td>
                                    <a href={"/np-admin/blog/" + post._id} className="btn btn-success rounded-start rounded-0">update</a>
                                    <button
                                        type="button"
                                        className="btn btn-danger rounded-end rounded-0 px-3"
                                        data-bs-toggle="modal"
                                        onClick={() => handleBtn(post._id, index)}
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
        )
    }

    return (
        <>
            <Navbar/>
            <Layout>
                <h1>Blog</h1>
                <hr/>
                <Modal
                    target={"delete-post"}
                    label={"exampleModalLabel"}
                    title={"delete post"}
                    btn={"delete"}
                    submit={handleSubmit}
                >are you sure?</Modal>
                {topBar()}
                <hr/>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                {table()}
            </Layout>
        </>
    )
}

export default Index;