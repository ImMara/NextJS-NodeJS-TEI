import React from 'react';

function CarouselFeatured(props) {
    return (
        <div className="col-12 mt-5 mb-3">
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
                        <img src="https://picsum.photos/503/500" style={{height:"200px", objectFit:"cover"}} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block" style={{
                            textShadow:"black 0.1em 0.1em 0.2em"
                        }}>
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/580/500" style={{height:"200px", objectFit:"cover"}} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block" style={{
                            textShadow:"black 0.1em 0.1em 0.2em"
                        }}>
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/581/500" style={{height:"200px", objectFit:"cover"}} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block" style={{
                            textShadow:"black 0.1em 0.1em 0.2em"
                        }}>
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
    );
}

export default CarouselFeatured;