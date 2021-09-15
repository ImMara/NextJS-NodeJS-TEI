import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/bootstrap-5/table/Table";
import {getPosts} from "../../../server/queries/post.queries";

function Index(props) {
    return (
        <Navbar>
            <h1>Blog</h1>
            <hr/>
            {/* show btn Modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Table data={[{
                name:"Jean",
                lastName:"Jacod",
                handle:"yes",
                email:"jeanjacob@gmail.com"
            },{
                name:"Menu",
                lastName:"Beidou",
                handle:"no",
                email:"menube@gmail.com"
            }]}/>
        </Navbar>
    );
}

Index.getInitialProps = async ({req,res}) =>{
    const post = await getPosts();
    return {post};
}

export default Index;