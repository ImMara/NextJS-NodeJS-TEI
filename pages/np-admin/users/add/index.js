import React from 'react';
import Navbar from "../../../../components/admin/navbar/Navbar";
import Layout from "../../../../components/layout/Layout";

function Index(props) {
    return (
        <>
        <Navbar/>
            <Layout>

                <div className="row">

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="name"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">FirstName</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="name"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">LastName</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="name"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                    </div>

                </div>


        </Layout>
        </>
    );
}

export default Index;