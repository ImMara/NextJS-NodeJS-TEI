import React from 'react';
import {useRouter} from "next/router";
import {getPage, getPageBySlug} from "../server/queries/page.queries";
import {hydration} from "../utils/hydration";
import Navbar from "../templates/components/Navbar/Navbar";
import BasicLayout from "../templates/layouts/BasicLayout";

export async function getServerSideProps(context) {

    const slug = context.params.slug;

    const page = await getPageBySlug(slug);

    return {
        props: {page: hydration(page)}, // will be passed to the page component as props
    }
}


function Slug(props) {

    function createMarkup() {
        return {
            __html: props.page[0].body
        };
    }

    return(
    <>
        <Navbar/>
        <BasicLayout>
            <div className="container text-white p-3 mt-3" dangerouslySetInnerHTML={createMarkup()}/>
        </BasicLayout>
    </>
)
;
}

export default Slug;