import React from 'react';
import {getComment} from "../../../../../server/queries/comments.queries";
import {hydration} from "../../../../../utils/hydration";
import Layout from "../../../../../components/layout/Layout";
import Navbar from "../../../../../components/admin/navbar/Navbar";

export async function getServerSideProps(context) {

    // id from url
    const id = context.params.id;
    // comments from db with id
    const comments = await getComment(id);

    // create props
    return {
        props: { comments: hydration(comments) }
    }

}

function Index(props) {
    return (
        <>
            <Navbar/>
            <Layout>

            </Layout>
        </>
    );
}

export default Index;