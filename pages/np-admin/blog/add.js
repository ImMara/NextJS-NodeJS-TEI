import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";

function Add(props) {

    const [post,setPost] = useState();

    return (
        <Navbar>
            <h1>Ajouter un article de blog</h1>
            <div className="row">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"
                           placeholder="mon article de fou"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="example">Category</label>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">date</label>
                    <input type="date" className="form-control" id="exampleFormControlInput1"
                           placeholder="mon article de fou"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">body</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">short description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Status
                            </label>
                    </div>
                        <div className="mb-3">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            allow_comments
                        </label>
                    </div>
                    <button className="btn btn-danger">Ajouter un article</button>
                </div>
            </div>
        </Navbar>
);
}

export default Add;