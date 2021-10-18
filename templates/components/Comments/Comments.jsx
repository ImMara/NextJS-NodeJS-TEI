import React, {useState} from 'react';
import Pagination from "../../../components/shared/Pagination/Pagination";

function Comments(props) {

    const comments = props.comments;

    //pagination
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 6;

    const paginatedData = Pagination.getData(
        comments,
        currentPage,
        itemsPerPage
    );

    return (
        <div>
            <hr/>
            <h5>{comments.length} Commentaire(s)</h5>
            <div className={"mb-3"}>
                {itemsPerPage < comments.length &&
                (
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={comments.length}
                        onPageChanged={handlePageChange}
                    />
                )
                }
            </div>
            {
                paginatedData.map(comment => (
                    <div className="my-4 d-flex">
                        <div>
                            <div className="mb-2">
                                <h5 className="m-0">{comment.username}</h5>
                                <span className="me-3 small">{comment.date.substr(0,10)}</span>
                            </div>
                            <p>
                                {comment.body}
                            </p>
                        </div>
                    </div>
                ))
            }
            <div>
                {itemsPerPage < comments.length && (
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={comments.length}
                        onPageChanged={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

export default Comments;