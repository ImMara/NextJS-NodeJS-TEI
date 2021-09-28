import React from 'react';

function Comments(props) {
    return (
        <div>
            <h5>3 Comments</h5>
            <div className="my-4 d-flex">
                <img
                    src="https://i.pravatar.cc/300"
                    className={" avatar-md rounded-circle float-start me-3"}
                    alt=""
                    style={{
                        height:"3rem",
                        width: "3rem",
                        position: "relative",
                     }}
                />
                <div>
                    <div className="mb-2">
                        <h5 className="m-0">Allen smith</h5>
                        <span className="me-3 small">June 11, 2021 at 6:01 am </span>
                    </div>
                    <p>
                        Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.
                    </p>
                </div>
            </div>
            <div className="my-4 d-flex">
                <img
                    src="https://i.pravatar.cc/400"
                    className={" avatar-md rounded-circle float-start me-3"}
                    alt=""
                    style={{
                        height:"3rem",
                        width: "3rem",
                        position: "relative",
                    }}
                />
                <div>
                    <div className="mb-2">
                        <h5 className="m-0">Frances Guerrero</h5>
                        <span className="me-3 small">June 14, 2021 at 12:35 pm</span>
                    </div>
                    <p>
                        Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible.
                    </p>
                </div>
            </div>
            <div className="my-4 d-flex">
                <img
                    src="https://i.pravatar.cc/200"
                    className={" avatar-md rounded-circle float-start me-3"}
                    alt=""
                    style={{
                        height:"3rem",
                        width: "3rem",
                        position: "relative",
                    }}
                />
                <div>
                    <div className="mb-2">
                        <h5 className="m-0">Judy Nguyen</h5>
                        <span className="me-3 small">June 18, 2021 at 11:55 am</span>
                    </div>
                    <p>
                        Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Comments;