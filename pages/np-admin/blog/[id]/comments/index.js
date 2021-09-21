import React from 'react';
import {hydration} from "../../../../../utils/hydration";
import { getCommentsPost } from "../../../../../server/queries/comments.queries";
import Layout from "../../../../../components/layout/Layout";
import Navbar from "../../../../../components/admin/navbar/Navbar";

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

    console.log(props.comments);

    return (
        <>
            <Navbar/>
            <Layout>

            </Layout>
        </>
    );
}

export default Index;