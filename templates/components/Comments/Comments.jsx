import React from 'react';

function Comments(props) {

    const comments = props.comments;

    return (
        <div>
            <hr/>
            <h5>{comments.length} Commentaire(s)</h5>
            {
                comments.map(comment => (
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
        </div>
    );
}

export default Comments;