
import React from 'react';
import {getPage} from "../server/queries/page.queries";
import {hydration} from "../utils/hydration";
import Navbar from "../templates/components/Navbar/Navbar";

export async function getStaticProps(context) {

    const id = "615b568e2bcc6e25e44220e3";
    // get all CategoriesWidget from db
    const page = await getPage(id);

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {page: hydration(page)}, // will be passed to the page component as props
        }
    }
    function dazdazda(props) {
        function createMarkup() {
            return {
                __html: props.page.body
            };
        }

    return (
        <>
            <Navbar/>
            <div className="container text-white" dangerouslySetInnerHTML={createMarkup()}>

            </div>
        </>
    );
}

export default dazdazda;
