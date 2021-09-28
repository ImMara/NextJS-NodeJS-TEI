import React from 'react';

function CategoriesWidget(props) {
    return (
        <div className="col-lg-3 mt-5 mt-lg-0">
            <div className="row g-2">
                <div className="col-4">
                    <div className="bg-danger rounded d-flex justify-content-center align-items-center" style={{height:"100px"}}>
                        <i className="bi bi-instagram" style={{fontSize: "2rem"}}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="bg-primary rounded d-flex justify-content-center align-items-center" style={{height:"100px"}}>
                        <i className="bi bi-facebook" style={{fontSize: "2rem"}}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="bg-success rounded d-flex justify-content-center align-items-center" style={{height:"100px"}}>
                        <i className="bi bi-twitter" style={{fontSize: "2rem"}}/>
                    </div>
                </div>
            </div>
            <div>
                <h4 className={"mt-4 mb-3"}>Trending topics</h4>
                <div
                    style={{backgroundImage:"url('https://picsum.photos/530/500')",backgroundSize:"cover",textShadow:"black 0.1em 0.1em 0.2em"}}
                    className={"text-center mb-3 rounded bg-dark p-3"}
                >
                    Travel
                </div>
                <div
                    style={{backgroundImage:"url('https://picsum.photos/536/500')",backgroundSize:"cover",textShadow:"black 0.1em 0.1em 0.2em"}}
                    className={"text-center mb-3 rounded bg-dark p-3"}
                >
                    Business
                </div>
                <div
                    style={{backgroundImage:"url('https://picsum.photos/548/500')",backgroundSize:"cover",textShadow:"black 0.1em 0.1em 0.2em"}}
                    className={"text-center mb-3 rounded bg-dark p-3"}
                >
                    Marketing
                </div>
                <div
                    style={{backgroundImage:"url('https://picsum.photos/70/70')",backgroundSize:"cover",textShadow:"black 0.1em 0.1em 0.2em"}}
                    className={"text-center mb-3 rounded bg-dark p-3"}
                >
                    Photography
                </div>
                <div
                    style={{backgroundImage:"url('https://picsum.photos/53/50')",backgroundSize:"cover",textShadow:"black 0.1em 0.1em 0.2em"}}
                    className={"text-center mb-3 rounded bg-dark p-3"}
                >
                    Sports
                </div>
                <div className="text-center">
                    <a href="">View more category</a>
                </div>
            </div>
        </div>
    );
}

export default CategoriesWidget;