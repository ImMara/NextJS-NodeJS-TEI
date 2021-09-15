import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import Input from "../../../components/bootstrap-5/input/Input";
import Textarea from "../../../components/bootstrap-5/input/Textarea";
import Select from "../../../components/bootstrap-5/input/Select";
import Checkbox from "../../../components/bootstrap-5/input/Checkbox";
import {getCategory} from "../../../server/queries/category.queries";


function Add(props) {

    const [post,setPost] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPost({...post,[name]:value})
    }

    return (
        <Navbar>
            <h1>Ajouter un article de blog</h1>
            <div className="row">

                <div className="mb-3">
                    <Input
                        type="text"
                        name={"title"}
                        placeholder={"titre de votre article"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <Select
                        name={"category"}
                        label="category"
                        onChange={handleChange}
                    >
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Select>
                </div>

                <div className="mb-3">
                    <Textarea
                        label={"content"}
                        name={"body"}
                        row={"3"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <Textarea
                        label={"short description"}
                        name={"short_desc"}
                        row={"3"}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-check mb-3 ms-3">
                    <Checkbox
                        label="allow comments"
                        name={"allowComment"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <button className="btn btn-danger">Ajouter un article</button>
                </div>

            </div>
        </Navbar>
);
}

Add.getInitialProps = async ({req,res}) =>{
    const category = await getCategory();
    return { category }
}

export default Add;