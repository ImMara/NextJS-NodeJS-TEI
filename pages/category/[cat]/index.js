import React, {useEffect, useState} from 'react';
import Navbar from "../../../templates/components/Navbar/Navbar";
import CategoriesWidget from "../../../templates/components/CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../../../templates/components/CarouselFeatured/CarouselFeatured";
import Footer from "../../../templates/components/Footer/Footer";
import {getCategories, getCategoryByName} from "../../../server/queries/category.queries";
import {getFeatured, getPost, getPostsByCategory} from "../../../server/queries/post.queries";
import {hydration} from "../../../utils/hydration";
import Link from "next/link";
import Pagination from "../../../components/shared/Pagination/Pagination";

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

    const [posts,setPosts]= useState(props.posts);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 10;

    const paginatedData = Pagination.getData(
        posts,
        currentPage,
        itemsPerPage
    );

    useEffect(() =>{
        setPosts(props.posts);
    })

    return (
        <>
            <Navbar/>
            <div className="container text-white">

                <div className="row g-4 mb-3">
                    <div className="col-12 bg-dark mb-5 d-flex py-5 mt-5 rounded justify-content-center align-items-center">
                        <h1>Catégorie : <strong>{props.cat}</strong></h1>
                    </div>
                    <div className="col-lg-9 mb-5">
                        <div className={"mb-3"}>
                            {itemsPerPage < posts.length &&
                            (
                                <Pagination
                                    currentPage={currentPage}
                                    itemsPerPage={itemsPerPage}
                                    length={posts.length}
                                    onPageChanged={handlePageChange}
                                />
                            )
                            }
                        </div>
                        {
                            paginatedData.map((post,index)=>(

                                <Link href={"/post/"+post._id}>
                                    <div className="row mb-3" style={{cursor: "pointer"}}>
                                        <div className="col-md-5" style={{height:"300px"}}>
                                            <img className={"rounded w-100 h-100"} style={{height:"300px",objectFit:"cover"}} src={"/images/blogs/resized/"+post.image} alt=""/>
                                        </div>
                                        <div className="col-md-7 mt-3 mt-md-0">
                                                <div>
                                                    <a href="#" className="badge link-light bg-primary p-2 mb-2"><i className="fas fa-circle me-2 small fw-bold"/>{props.cat}</a>
                                                    <h4>{post.title}</h4>
                                                    <p>{post.short_description}</p>
                                                    <div className={"d-flex align-items-center"}>
                                                        <h5 className="me-3">{post.author.username}</h5>
                                                        <span className="small">{post.date.substr(0,10)}</span>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </Link>

                            ))
                        }
                        <div>
                            {itemsPerPage < posts.length &&
                            (
                                <Pagination
                                    currentPage={currentPage}
                                    itemsPerPage={itemsPerPage}
                                    length={posts.length}
                                    onPageChanged={handlePageChange}
                                />
                            )
                            }
                        </div>
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