import React from 'react';

function FullCard(props) {
    return (
        <>
        <div
            className="card relative"
            style={{
                backgroundImage:'url('+props.image+')',
                backgroundPosition:'center left',
                backgroundSize:"cover",
                height:props.height,
                border:' 0 solid rgba(0, 0, 0, 0.1)',
                filter: 'saturate(150%)',
            }}
            >
            <div className="card-body d-flex align-items-center p-3">
                <div className="w-100 mt-auto text-white">
                    <a href="mb-2">
                        <span
                            className="badge bg-danger"
                        >Lifestyle</span>
                    </a>
                    <h2 className="card-title">
                        <a
                            className="btn-link stretched-link text-reset"
                            style={{
                                textShadow:"black 0.1em 0.1em 0.2em"
                            }}
                            href={"/post/"+props.post._id}>{props.post.title}</a>
                    </h2>
                    {
                        !props.short && (
                            // lorem 25
                            <p style={{
                                textShadow:"black 0.1em 0.1em 0.2em"
                            }}>{props.post.short_description}</p>
                        )
                    }
                    <div className={"d-flex align-items-center"}  style={{
                        textShadow:"black 0.1em 0.1em 0.2em"
                    }}>
                        {
                            !props.short && (
                                <img
                                    src="https://i.pravatar.cc/200"
                                    className={"avatar-md rounded-circle float-start me-2"}
                                    alt=""
                                    style={{
                                        height:"3rem",
                                        width: "3rem",
                                        position: "relative",
                                    }}
                                />
                            )
                        }
                        <h5 className="me-3">Judy Nguyen</h5>
                        {
                            !props.short && (
                                <span className="small">June 18, 2021 at 11:55 am</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default FullCard;