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
            .delete("http://localhost:3000/api/blog/post/" + id)
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
                    <div className="col">
                        <Link href={"/np-admin/blog/add"}>
                            <a className="btn btn-primary">Ajouter un article</a>
                        </Link>
                        <Link href={"/np-admin/blog/category"}>
                            <a className="btn btn-primary mx-2">Ajouter une categorie</a>
                        </Link>
                        <Link href={"/np-admin/blog/comments"}>
                            <a className="btn btn-primary mx-2">Voir tous les commentaires</a>
                        </Link>
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
                        <th scope="col">Commentaire</th>
                        <th scope="col"></th>
                        <th scope="col">Publié</th>
                        <th scope="col">Categorie</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        posts.map((post, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{post.title}</td>
                                <td>{post.allowComment.toString()}</td>
                                <td>
                                    <Link href={"/np-admin/blog/" + post._id+"/comments"}>
                                        <a className={"btn btn-primary"}>Commentaires</a>
                                    </Link>
                                </td>
                                <td>{post.status.toString()}</td>
                                <td>{post.category && post.category.title}</td>
                                <td>
                                    <Link href={"/np-admin/blog/" + post._id}>
                                        <a className="btn btn-success rounded-start rounded-0">update</a>
                                    </Link>
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