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
import Pagination from "../../../components/shared/Pagination/Pagination";

export async function getServerSideProps(context) {

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
    //pagination
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 5;
    const paginatedData = Pagination.getData(
        posts,
        currentPage,
        itemsPerPage
    );

    /* RENDER HTML */

    const topBar = () => {
        return (
            <>
                <div className="row">
                    <div className="col-12 gy-1 gx-1 row">
                        <div className="col-12 col-lg-4">
                            <a  href={"/np-admin/blog/add"} className="btn btn-primary w-100">Ajouter un article</a>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Link href={"/np-admin/blog/category"}>
                                <a className="btn btn-primary w-100">Ajouter une catégorie</a>
                            </Link>
                        </div>
                        <div className="col-12 col-lg-4">
                            <Link href={"/np-admin/blog/comments"}>
                                <a className="btn btn-primary w-100">Voir tous les commentaires</a>
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
                {itemsPerPage < posts.length &&
                (
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={posts.length}
                        onPageChanged={handlePageChange}
                    />
                )
                }
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th scope="col">Titre</th>
                        <th scope="col" className={"table-none"}>Commentaire</th>
                        <th scope="col" className={"table-none"}></th>
                        <th scope="col" className={"table-none"}>Publié</th>
                        <th scope="col" className={"table-none"}>Catégorie </th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paginatedData.map((post, index) => (
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
                                    <div className="row gy-1 gx-1">
                                        <div className="col-12 col-xxl-6">
                                            <a href={"/np-admin/blog/" + post._id} className="btn btn-success w-100">Modifier</a>
                                        </div>
                                        <div className="col-12 col-xxl-6">
                                            <button
                                                type="button"
                                                className="btn btn-danger px-3 w-100"
                                                data-bs-toggle="modal"
                                                onClick={() => handleBtn(post._id, index)}
                                                data-bs-target="#delete-post">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {itemsPerPage < posts.length &&
                (
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={posts.length}
                        onPageChanged={handlePageChange}
                    />
                )
                }
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
                    title={"Supprimer un article"}
                    btn={"Supprimer"}
                    submit={handleSubmit}
                >Êtes-vous sûr ?</Modal>
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