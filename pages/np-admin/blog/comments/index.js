import React from 'react';
import {getComments} from "../../../../server/queries/comments.queries";
import {hydration} from "../../../../utils/hydration";
import Layout from "../../../../components/layout/Layout";
import Navbar from "../../../../components/admin/navbar/Navbar";

export async function getStaticProps(context) {

    // comments from db
    const comments = await getComments();

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