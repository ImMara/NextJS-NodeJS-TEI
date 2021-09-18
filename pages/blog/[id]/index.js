import React from 'react';
import {getPost, getPosts} from "../../../server/queries/post.queries";
import {hydration} from "../../../utils/hydration";

export async function getServerSideProps(context) {

    const id = context.params.id;
    const post = await getPost(id);

    return {
        props: { post: hydration(post) }, // will be passed to the page component as props
    }
}


function Index(props) {

    function createMarkup() {
        return {__html: props.post.body };
    }

    return (
        <div className={"container bg-light rounded p-3 my-5"} dangerouslySetInnerHTML={createMarkup()}>
        </div>
    );
}

export default Index;