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
                            href="#">Title of random card</a>
                    </h2>
                    <ul
                        className="nav nav-divider"
                        style={{
                            textShadow:"black 0.1em 0.1em 0.2em"
                        }}
                    >
                        <li>by random user</li>
                        <li>Nov 15,2021</li>
                        <li>5 min read</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}

export default FullCard;