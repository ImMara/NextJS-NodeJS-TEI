import React from 'react';
import Footer from "../templates/components/Footer/Footer";
import Navbar from "../templates/components/Navbar/Navbar";
import Content from "../templates/components/Content/Content";
import Last from "../templates/components/Last/Last";
import {getCategories} from "../server/queries/category.queries";
import {hydration} from "../utils/hydration";
import {getFeatured, getLastPosts, getPostsWithAuthorAndCategory} from "../server/queries/post.queries";

export async function getServerSideProps(context) {

    // get all CategoriesWidget from db
    const categories = await getCategories();
    const posts = await getPostsWithAuthorAndCategory();
    const featured = await getFeatured();
    const lastPosts= await getLastPosts(5);

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {
            categories: hydration(categories),
            posts:hydration(posts),
            featured:hydration(featured),
            lastPosts:hydration(lastPosts),
        }, // will be passed to the page component as props
    }
}

export default function Index(props) {
    return (
        <>
            <Navbar/>
            <div className="container text-white">
                <Last posts={props.lastPosts} />
                <Content categories={props.categories} posts={props.posts} featured={props.featured} />
            </div>
            <Footer/>
        </>
    );
}