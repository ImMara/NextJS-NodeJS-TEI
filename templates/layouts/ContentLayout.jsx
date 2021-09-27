import React from 'react';

function ContentLayout(props) {
    return (
        <div className={"row"}>
            <div className="col-lg-9">

                <div className="mb-5">
                    <h2 className={"m-0"}>Today's top highlights</h2>
                    <p>Latest breaking news, pictures, videos, and special reports</p>
                </div>

                <div className="row">
                    <div className="col-6">
                        <img className={"rounded"} src="https://picsum.photos/500/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                       <h1>12 worst types of business accounts you follow on Twitter</h1>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>

                    <div className="col-6">
                        <img className={"rounded"} src="https://picsum.photos/500/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                        <h1>Dirty little secrets about the business industry</h1>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>

                    <div className="col-6">
                        <img className={"rounded"} src="https://picsum.photos/500/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                        <h1>Dirty little secrets about the business industry</h1>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>

                    <div className="col-6">
                        <img className={"rounded"} src="https://picsum.photos/500/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                        <h1>Dirty little secrets about the business industry</h1>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>
                </div>
                
            </div>
            <div className="col-lg-3 mt-5 mt-lg-0">
                <div className="row g-2">
                    <div className="col-4">
                        <div className="bg-danger" style={{height:"100px"}}>

                        </div>
                    </div>
                    <div className="col-4">
                        <div className="bg-primary" style={{height:"100px"}}>

                        </div>
                    </div>
                    <div className="col-4">
                        <div className="bg-success" style={{height:"100px"}}>

                        </div>
                    </div>
                </div>
                <div>
                    <h4 className={"mt-4 mb-3"}>Trending topics</h4>
                    <div
                        className={"text-center mb-3 rounded bg-dark p-3"}
                    >
                        Travel
                    </div>
                    <div
                        className={"text-center mb-3 rounded bg-dark p-3"}
                    >
                        Business
                    </div>
                    <div
                        className={"text-center mb-3 rounded bg-dark p-3"}
                    >
                        Marketing
                    </div>
                    <div
                        className={"text-center mb-3 rounded bg-dark p-3"}
                    >
                        Photography
                    </div>
                    <div
                        className={"text-center mb-3 rounded bg-dark p-3"}
                    >
                        Sports
                    </div>
                    <div className="text-center">
                        <a href="">View more category</a>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="col-12 mt-5">
                <div className="mb-4 d-md-flex justify-content-between align-items-center">
                    <h2 className="m-0">Featured Articles</h2>

                </div>
                <div id="carouselExampleCaptions"  className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"/>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"/>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"/>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://picsum.photos/500/500" style={{height:"200px", objectFit:"cover"}} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://picsum.photos/500/500" style={{height:"200px", objectFit:"cover"}} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://picsum.photos/500/500" style={{height:"200px", objectFit:"cover"}} className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContentLayout;