import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from 'next/link';
import Pagination from "../../../components/shared/Pagination/Pagination";
function Posts(props) {

    const [posts,setPosts]= useState(props.posts);
    const [loading,setLoading] = useState(true);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 4;

    const paginatedData = Pagination.getData(
        posts,
        currentPage,
        itemsPerPage
    );

    return (
        <div className="col-lg-9 mb-5">
                        <div className="mb-5">
                            <h2 className={"m-0"}><i className="bi bi-hourglass-top me-2"/>Today's top highlights</h2>
                            <p>Latest breaking news, pictures, videos, and special reports</p>
                        </div>

                        <div className="row">
                        {
                            paginatedData.map((post,index) => (
                                <Link href={"/post/" + post._id}>
                                    <div className="col-md-6 mb-3" style={{cursor: "pointer"}} key={index}>
                                        <div className="position-relative">
                                            <img className={"rounded"} src={"/images/blogs/resized/"+post.image} style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                                            <a href="#" className={"position-absolute bottom-0 start-0 link-dark ms-3 mb-3 badge bg-primary me-2 small fw-bold"}><i className="fas fa-circle me-2 small fw-bold"/>{post.category ? post.category.title : "no category"}</a>
                                        </div>
                                        <h4 className={"mt-1"}>{post.title}</h4>
                                        <p className={"w-100"}>{post.short_description}</p>
                                        <div className={"d-flex align-items-center"}>
                                            <h5 className="me-3">{ post.author !== null ? post.author.username : "anonymous"}</h5>
                                            <span className="small">{post.date.substring(0, 10)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
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
    );
}

export default Posts;