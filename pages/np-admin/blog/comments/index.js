import React, {useState} from 'react';
import {getComments} from "../../../../server/queries/comments.queries";
import {hydration} from "../../../../utils/hydration";
import Layout from "../../../../components/layout/Layout";
import Navbar from "../../../../components/admin/navbar/Navbar";
import Link from 'next/link';
import {truncateString} from "../../../../utils/functions";

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

    return (
        <>
            <Navbar/>
            <Layout>
                <div className="row gy-0 gx-0">
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
                                                <a className={"btn btn-danger"}>delete</a>
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