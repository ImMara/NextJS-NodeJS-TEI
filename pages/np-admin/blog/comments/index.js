import React, {useState} from 'react';
import {getComments} from "../../../../server/queries/comments.queries";
import {hydration} from "../../../../utils/hydration";
import Layout from "../../../../components/layout/Layout";
import Navbar from "../../../../components/admin/navbar/Navbar";
import Link from 'next/link';
import {truncateString} from "../../../../utils/functions";
import axios from "axios";

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

    const handleDelete = () => {
        axios
            .delete('/api/blog/comments/' + id )
            .then(r => {

            })
    }

    return (
        <>
            <Navbar/>
            <Layout>
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
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Commentaire</th>
                                    <th>Titre de l'article</th>
                                    <th>Date</th>
                                    <th>Utilisateur</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    comments.map((comment,index) => (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{truncateString(comment.body,15)}</td>
                                            <td>{comment.post_id &&( comment.post_id.title ) }</td>
                                            <td>{comment.date.substr(0,10)}</td>
                                            <td>{comment.username}</td>
                                            <td>{comment.email}</td>
                                            <td>
                                                <a className={"btn btn-danger"}>Supprimer</a>
                                                <Link href={"/np-admin/blog/comments/"+comment._id}>
                                                    <a className={"btn btn-primary"}>Voir</a>
                                                </Link>
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