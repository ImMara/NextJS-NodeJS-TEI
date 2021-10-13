import React from 'react';
import CategoriesWidget from "../CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../CarouselFeatured/CarouselFeatured";
import Posts from "../Posts/Posts";

function Content(props) {

    return (
        <div className={"row mb-3"}>
            <Posts posts={props.posts}/>
            <CategoriesWidget categories={props.categories}/>
            <hr/>
            <CarouselFeatured featured={props.featured}/>
        </div>
    );
}

export default Content;