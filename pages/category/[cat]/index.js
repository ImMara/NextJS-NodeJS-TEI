import React from 'react';
import Navbar from "../../../templates/components/Navbar/Navbar";
import CategoriesWidget from "../../../templates/components/CategoriesWidget/CategoriesWidget";
import CarouselFeatured from "../../../templates/components/CarouselFeatured/CarouselFeatured";
import Footer from "../../../templates/components/Footer/Footer";
import {getCategories} from "../../../server/queries/category.queries";
import {getPost} from "../../../server/queries/post.queries";
import {hydration} from "../../../utils/hydration";

export async function getServerSideProps(context) {

    const cat = context.params.cat;


    return {
        props: { cat: hydration(cat) }, // will be passed to the page component as props
    }
}

function Index(props) {
    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row g-4 mb-3">
                    <div className="col-12 bg-dark mb-5 d-flex py-5 mt-5 rounded justify-content-center align-items-center">
                        <h1>Catégorie : <strong>{props.cat}</strong></h1>
                    </div>

                    <div className="col-lg-9 mb-5">

                        <div className="row mb-3">
                            <div className="col-md-5" style={{height:"300px"}}>
                                <img className={"rounded w-100 h-100"} style={{height:"300px",objectFit:"cover"}} src="https://picsum.photos/400/501" alt=""/>
                            </div>
                            <div className="col-md-7 mt-3 mt-md-0">
                                <a href="#" className="badge bg-danger mb-2"><i
                                    className="fas fa-circle me-2 small fw-bold"/>Lifestyle</a>
                                <h3><a className="btn-link stretched-link text-reset">The pros
                                    and cons of business agency</a></h3>
                                <p>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer Person she control of to beginnings view looked eyes Than continues its and because</p>
                                <div className={"d-flex align-items-center"}>
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
                                    <h5 className="me-3">Judy Nguyen</h5>
                                    <span className="small">June 18, 2021 at 11:55 am</span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-5" style={{height:"300px"}}>
                                <img className={"rounded w-100 h-100"} style={{height:"300px",objectFit:"cover"}} src="https://picsum.photos/400/555" alt=""/>
                            </div>
                            <div className="col-12 col-md-7 mt-3 mt-md-0">
                                <a href="#" className="badge bg-danger mb-2"><i
                                    className="fas fa-circle me-2 small fw-bold"/>Lifestyle</a>
                                <h3><a className="btn-link stretched-link text-reset">The pros
                                    and cons of business agency</a></h3>
                                <p>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer Person she control of to beginnings view looked eyes Than continues its and because</p>
                                <div className={"d-flex align-items-center"}>
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
                                    <h5 className="me-3">Judy Nguyen</h5>
                                    <span className="small">June 18, 2021 at 11:55 am</span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-5" style={{height:"300px"}}>
                                <img className={"rounded w-100 h-100"} style={{objectFit:"cover"}} src="https://picsum.photos/470/500" alt=""/>
                            </div>
                            <div className="col-md-7 mt-3 mt-md-0">
                                <a href="#" className="badge bg-danger mb-2"><i
                                    className="fas fa-circle me-2 small fw-bold"/>Lifestyle</a>
                                <h3><a className="btn-link stretched-link text-reset">The pros
                                    and cons of business agency</a></h3>
                                <p>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer Person she control of to beginnings view looked eyes Than continues its and because</p>
                                <div className={"d-flex align-items-center"}>
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
                                    <h5 className="me-3">Judy Nguyen</h5>
                                    <span className="small">June 18, 2021 at 11:55 am</span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-5" style={{height:"300px"}}>
                                <img className={"rounded w-100 h-100"} style={{objectFit:"cover"}} src="https://picsum.photos/450/500" alt=""/>
                            </div>
                            <div className="col-md-7 mt-3 mt-md-0">
                                <a href="#" className="badge bg-danger mb-2"><i
                                    className="fas fa-circle me-2 small fw-bold"/>Lifestyle</a>
                                <h3><a className="btn-link stretched-link text-reset">The pros
                                    and cons of business agency</a></h3>
                                <p>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer Person she control of to beginnings view looked eyes Than continues its and because</p>
                                <div className={"d-flex align-items-center"}>
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
                                    <h5 className="me-3">Judy Nguyen</h5>
                                    <span className="small">June 18, 2021 at 11:55 am</span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-5" style={{height:"300px"}}>
                                <img className={"rounded w-100 h-100"} style={{objectFit:"cover"}} src="https://picsum.photos/400/500" alt=""/>
                            </div>
                            <div className="col-md-7 mt-3 mt-md-0">
                                <a href="#" className="badge bg-danger mb-2"><i
                                    className="fas fa-circle me-2 small fw-bold"/>Lifestyle</a>
                                <h3><a className="btn-link stretched-link text-reset">The pros
                                    and cons of business agency</a></h3>
                                <p>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer Person she control of to beginnings view looked eyes Than continues its and because</p>
                                <div className={"d-flex align-items-center"}>
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
                                    <h5 className="me-3">Judy Nguyen</h5>
                                    <span className="small">June 18, 2021 at 11:55 am</span>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3" >
                            <div className="col-md-5" style={{height:"300px"}}>
                                <img className={"rounded w-100 h-100"} style={{objectFit:"cover"}} src="https://picsum.photos/400/510" alt=""/>
                            </div>
                            <div className="col-md-7 mt-3 mt-md-0">
                                <a href="#" className="badge bg-danger mb-2"><i
                                    className="fas fa-circle me-2 small fw-bold"/>Lifestyle</a>
                                <h3><a className="btn-link stretched-link text-reset">The pros
                                    and cons of business agency</a></h3>
                                <p>Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer Person she control of to beginnings view looked eyes Than continues its and because</p>
                                <div className={"d-flex align-items-center"}>
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
                                    <h5 className="me-3">Judy Nguyen</h5>
                                    <span className="small">June 18, 2021 at 11:55 am</span>
                                </div>
                            </div>
                        </div>

                    </div>



                    <CategoriesWidget/>
                    <hr/>
                    <CarouselFeatured/>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Index;