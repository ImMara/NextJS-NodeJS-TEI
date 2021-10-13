import React from 'react';
import Navbar from "../../../templates/components/Navbar/Navbar";
import CategoriesWidget from "../../../templates/components/CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../../../templates/components/CarouselFeatured/CarouselFeatured";
import Footer from "../../../templates/components/Footer/Footer";
import {getCategories, getCategoryByName} from "../../../server/queries/category.queries";
import {getFeatured, getPost, getPostsByCategory} from "../../../server/queries/post.queries";
import {hydration} from "../../../utils/hydration";
import Link from "next/link";

export async function getServerSideProps(context) {

    const cat = context.params.cat;
    const categories= await getCategories();
    const featured = await getFeatured();

    const category = await getCategoryByName(cat);
    const posts = await getPostsByCategory(category[0]._id);

    return {
        props: {
            cat: hydration(cat),
            categories: hydration(categories),
            featured: hydration(featured),
            posts: hydration(posts)
        }, // will be passed to the page component as props
    }
}

function Index(props) {
    return (
        <>
            <Navbar/>
            <div className="container text-white">
                <div className="row g-4 mb-3">
                    <div className="col-12 bg-dark mb-5 d-flex py-5 mt-5 rounded justify-content-center align-items-center">
                        <h1>Catégorie : <strong>{props.cat}</strong></h1>
                    </div>

                    <div className="col-lg-9 mb-5">
                        {
                            props.posts.map((post,index)=>(
                                    <div className="row mb-3">
                                        <div className="col-md-5" style={{height:"300px"}}>
                                            <img className={"rounded w-100 h-100"} style={{height:"300px",objectFit:"cover"}} src="https://picsum.photos/400/501" alt=""/>
                                        </div>
                                        <Link href={"/post/"+post._id}>
                                            <div className="col-md-7 mt-3 mt-md-0" style={{cursor:"pointer"}}>
                                                <a href="#" className="badge bg-danger mb-2"><i
                                                    className="fas fa-circle me-2 small fw-bold"/>{props.cat}</a>
                                                <h3><a className="btn-link stretched-link text-reset">{post.title}</a></h3>
                                                <p>{post.short_description}</p>
                                                <div className={"d-flex align-items-center"}>
                                                    <h5 className="me-3">{post.author.username}</h5>
                                                    <span className="small">{post.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                            ))
                        }

                    </div>

                    <CategoriesWidget categories={props.categories}/>
                    <hr/>
                    <CarouselFeatured featured={props.featured}/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Index;