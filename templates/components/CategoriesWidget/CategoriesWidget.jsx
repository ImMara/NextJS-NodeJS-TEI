import React from 'react';
import Link from 'next/link';

function CategoriesWidget(props) {
    return (
        <div className="col-lg-3 mt-5 mt-lg-0">
            <div className="row g-2">
                    <div className="col-4">
                        <a href={"https://instagram.com/"} className={"link-light"}>
                            <div className="bg-danger rounded d-flex justify-content-center align-items-center" style={{height:"100px"}}>
                                <i className="bi bi-instagram" style={{fontSize: "2rem"}}/>
                            </div>
                        </a>
                    </div>
                    <div className="col-4">
                        <a href={"https://facebook.com"} className={"link-light"}>
                            <div className="bg-primary rounded d-flex justify-content-center align-items-center" style={{height:"100px"}}>
                                <i className="bi bi-facebook" style={{fontSize: "2rem"}}/>
                            </div>
                        </a>
                    </div>

                    <div className="col-4">
                        <a href="https://twitter.com" className={"link-light"}>
                            <div className="bg-success rounded d-flex justify-content-center align-items-center" style={{height:"100px"}}>
                                <i className="bi bi-twitter" style={{fontSize: "2rem"}}/>
                            </div>
                        </a>
                    </div>
            </div>
            <div>
                <h4 className={"mt-4 mb-3"}>Trending topics</h4>
                {
                    props.categories.map((cat,index)=>(
                        <div key={index}
                            style={{backgroundImage:"url('https://picsum.photos/53/50')",backgroundSize:"cover",textShadow:"black 0.1em 0.1em 0.2em"}}
                            className={"text-center mb-3 rounded bg-dark p-3"}
                        >
                            {cat.title}
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default CategoriesWidget;