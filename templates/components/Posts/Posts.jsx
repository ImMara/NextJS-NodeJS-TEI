import React, {useState} from 'react';
import Link from 'next/link';
import Pagination from "../../../components/shared/Pagination/Pagination";

function Posts(props) {

    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(true);

    //pagination
    const [currentPage, setCurrentPage] = useState(2);

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
                <h2 className={"m-0"}><i className="bi bi-hourglass-top me-2"/>L'actu en continu </h2>
                <p>le webzine de toutes les actualités High-Tech et Geek : les nouvelles technologies, les produits mobiles, musique et la culture geek.</p>
            </div>

            <div className={"d-flex flex-column justify-content-between"}>

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

                <div className="row" style={{minHeight: '850px'}}>
                    {
                        paginatedData.map((post, index) => (
                            <Link href={"/post/" + post._id}>
                                <div className="col-md-6 mb-3" style={{cursor: "pointer"}} key={index}>
                                    <div className="position-relative">
                                        <a href="#"
                                           className={"position-absolute p-2 bottom-0 start-0 link-light ms-3 mb-3 badge bg-primary me-2 small fw-bold"}><i
                                            className="fas fa-circle me-2 small fw-bold"/>{post.category ? post.category.title : "no category"}
                                        </a>
                                        <img className={"rounded"} src={"/images/blogs/resized/" + post.image}
                                             style={{height: "200px", width: "100%", objectFit: "cover"}} alt=""/>
                                    </div>
                                    <h4 className={"mt-1"}>{post.title}</h4>
                                    <p className={"w-100"}>{post.short_description}</p>
                                    <div className={"d-flex align-items-center"}>
                                        <h5 className="me-3">{post.author !== null ? post.author.username : "anonymous"}</h5>
                                        <span className="small">{post.date.substring(0, 10)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div>
                    {itemsPerPage < posts.length && (
                        <Pagination
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={posts.length}
                            onPageChanged={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Posts;