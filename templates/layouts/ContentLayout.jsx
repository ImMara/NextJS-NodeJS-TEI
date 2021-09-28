import React from 'react';
import CategoriesWidget from "../components/CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../components/CarouselFeatured/CarouselFeatured";

function ContentLayout(props) {
    return (
        <div className={"row mb-3"}>
            <div className="col-lg-9 mb-5">

                <div className="mb-5">
                    <h2 className={"m-0"}><i className="bi bi-hourglass-top me-2"/>Today's top highlights</h2>
                    <p>Latest breaking news, pictures, videos, and special reports</p>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="position-relative">
                            <img className={"rounded"} src="https://picsum.photos/400/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                            <a href="#" className={"position-absolute bottom-0 start-0 link-dark ms-3 mb-3 badge bg-primary me-2 small fw-bold"}><i className="fas fa-circle me-2 small fw-bold"/>Sports</a>
                        </div>
                        <h4>12 worst types of business accounts you follow on Twitter</h4>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>

                    <div className="col-md-6">
                        <div className="position-relative">
                            <img className={"rounded"} src="https://picsum.photos/510/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                            <a href="#" className={"position-absolute bottom-0 start-0 link-dark ms-3 mb-3 badge bg-danger me-2 small fw-bold"}><i className="fas fa-circle me-2 small fw-bold"/>Travel</a>
                        </div>
                        <h4>Dirty little secrets about the business industry</h4>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>

                    <div className="col-md-6">
                        <div className="position-relative">
                            <img className={"rounded"} src="https://picsum.photos/520/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                            <a href="#" className={"position-absolute bottom-0 start-0 ms-3 link-dark mb-3 badge bg-success me-2 small fw-bold"}><i className="fas fa-circle me-2 small fw-bold"/>Photography</a>
                        </div>
                        <h4>Dirty little secrets about the business industry</h4>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>

                    <div className="col-md-6">
                        <div className="position-relative">
                            <img className={"rounded"} src="https://picsum.photos/530/500" style={{height:"200px",width:"100%",objectFit:"cover"}} alt=""/>
                            <a href="#" className={"position-absolute bottom-0 start-0 ms-3 link-dark mb-3 badge bg-primary me-2 small fw-bold"}><i className="fas fa-circle me-2 small fw-bold"/>Sports</a>
                        </div>
                        <h4>Dirty little secrets about the business industry</h4>
                        <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to</p>
                    </div>
                </div>
                
            </div>
            <CategoriesWidget/>
            <hr/>
            <CarouselFeatured/>
        </div>
    );
}

export default ContentLayout;