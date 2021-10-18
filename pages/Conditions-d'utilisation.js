
import React from 'react';
import {getPage} from "../server/queries/page.queries";
import {hydration} from "../utils/hydration";
import Navbar from "../templates/components/Navbar/Navbar";
import BasicLayout from "../templates/layouts/BasicLayout";

export async function getStaticProps(context) {

    const id = "616d4745e407f695f1e5aa74";
    // get all CategoriesWidget from db
    const page = await getPage(id);

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {page: hydration(page)}, // will be passed to the page component as props
        }
    }
    function Conditionsdutilisation(props) {
        function createMarkup() {
            return {
                __html: props.page.body
            };
        }

    return (
        <>
            <Navbar/>
            <BasicLayout>
                <div className="container text-white p-3 mt-3" dangerouslySetInnerHTML={createMarkup()}>
    
                </div>
            </BasicLayout>
        </>
    );
}

export default Conditionsdutilisation;
