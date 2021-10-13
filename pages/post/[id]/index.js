import React from 'react';
import Navbar from "../../../templates/components/Navbar/Navbar";
import CategoriesWidget from "../../../templates/components/CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../../../templates/components/CarouselFeatured/CarouselFeatured";
import Footer from "../../../templates/components/Footer/Footer";
import {hydration} from "../../../utils/hydration";
import {getPosts} from "../../../server/queries/post.queries";
import Comments from "../../../templates/components/Comments/Comments";
import FormComment from "../../../templates/components/FormComment/FormComment";

export async function getServerSideProps(context) {

    // db call to get all posts
    const posts = await getPosts();

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {posts: hydration(posts)}, // will be passed to the page component as props
    }
}

function Index(props) {

    console.log(props.posts[0])

    function createMarkup() {
        return {
            __html: props.posts[0].body
        };
    }

    return (
        <>
            <Navbar/>
            <div className="container text-white">
                <div className="row g-4 mb-3">
                    <div className="col-12 pt-4 mb-5" style={{height:'400px' }}>
                        <img alt={""} src="https://picsum.photos/510/500" style={{objectFit:"cover", height:'100%',width:'100%'}} />
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-9 mb-5">
                            <h1>{props.posts[0].title}</h1>
                            <div className="body"  dangerouslySetInnerHTML={createMarkup()}/>
                       </div>
                        <CategoriesWidget/>
                    </div>
                    <div className="col-md-9">
                        <Comments/>
                        <FormComment/>
                    </div>
                </div>
                <hr/>
                <CarouselFeatured/>
            </div>
            <Footer/>
        </>

    );
}



export default Index;