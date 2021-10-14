import React, {useState} from 'react';
import Navbar from "../../../templates/components/Navbar/Navbar";
import CategoriesWidget from "../../../templates/components/CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../../../templates/components/CarouselFeatured/CarouselFeatured";
import Footer from "../../../templates/components/Footer/Footer";
import {hydration} from "../../../utils/hydration";
import {getFeatured, getPost, getPosts} from "../../../server/queries/post.queries";
import Comments from "../../../templates/components/Comments/Comments";
import FormComment from "../../../templates/components/FormComment/FormComment";
import {getCategories} from "../../../server/queries/category.queries";
import {useSettingsContext} from "../../../context/settings";

export async function getServerSideProps(context) {

    const id = context.params.id;
    // db call to get all posts
    const post = await getPost(id);
    const categories = await getCategories();
    const featured = await getFeatured();

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {
            post: hydration(post),
            categories: hydration(categories),
            featured:hydration(featured)
        }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [settings,setSettings] = useState(useSettingsContext());

    function createMarkup() {
        return {
            __html: props.post.body
        };
    }

    return (
        <>
            <Navbar/>
            <div className="container text-white">
                <div className="row g-4 mb-3">
                    <div className="col-12 pt-4 mb-5" style={{height:'400px' }}>
                        <img alt={""} src={"/images/blogs/resized/"+props.post.image} style={{objectFit:"cover", height:'100%',width:'100%'}} />
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-9 mb-5">
                            <h1>{props.post.title}</h1>
                            <div className="body"  dangerouslySetInnerHTML={createMarkup()}/>
                       </div>
                        <CategoriesWidget categories={props.categories} />
                    </div>
                    <div className="col-md-9">
                        {
                            // settings[0].comments &&
                            props.post.allowComment && (
                                <>
                                    <Comments/>
                                    <FormComment/>
                                </>
                            )
                        }
                    </div>
                </div>
                <hr/>
                <CarouselFeatured
                    featured={props.featured}
                />
            </div>
            <Footer/>
        </>

    );
}



export default Index;