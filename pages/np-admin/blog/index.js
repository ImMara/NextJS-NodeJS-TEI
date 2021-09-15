import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/bootstrap-5/table/Table";
import {getPosts} from "../../../server/queries/post.queries";
import Modal from "../../../components/bootstrap-5/modal/Modal";

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
            <Modal
                target={"exampleModal"}
                label={"exampleModalLabel"}
                title={"Modal title"}
            >...</Modal>

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