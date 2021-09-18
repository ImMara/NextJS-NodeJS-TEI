import React from 'react';
import {getPosts} from "../../server/queries/post.queries";
import {hydration} from "../../utils/hydration";

export async function getStaticProps(context) {

    const posts = await getPosts();

    return {
        props: { posts: hydration(posts) }, // will be passed to the page component as props
    }
}

function Index(props) {
    return (
       <div className="container">
           <div className="row">
           {props.posts.map(post => (
                    <>
                        <div className="col-4">
                            <div
                               className="card relative m-3"
                               style={{
                                   backgroundImage: 'url(https://picsum.photos/640/360)',
                                   backgroundPosition: "center left",
                                   backgroundSize: "cover",
                                   height: "400px",
                               }} >

                               <div className="card-body d-flex align-items-center p-3">
                                   <div className="w-100 mt-auto text-white">
                                       <a >
                                           <span className="badge bg-danger">{post.category.title}</span>
                                       </a>
                                       <h2 className="card-title h1">
                                           <a className="btn-link stretched-link text-reset" href={"/blog/"+post._id}>{post.title}</a>
                                       </h2>
                                       <p className="card-text">
                                           <span className="text-shadow-lg">{post.short_description}</span>
                                       </p>
                                       <ul className="nav nav-divider">
                                           <li>{post.category.title}</li>
                                           <li>{post.date}</li>
                                           <li>5min to read</li>
                                       </ul>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </>
           ))}
           </div>
       </div>
    );
}

export default Index;