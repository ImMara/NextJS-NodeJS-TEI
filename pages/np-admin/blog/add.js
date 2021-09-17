import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import Input from "../../../components/bootstrap-5/input/Input";
import Textarea from "../../../components/bootstrap-5/input/Textarea";
import Select from "../../../components/bootstrap-5/input/Select";
import Checkbox from "../../../components/bootstrap-5/input/Checkbox";
import {getCategories, getCategory} from "../../../server/queries/category.queries";
import axios from "axios";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import {hydration} from "../../../utils/hydration";
import Link from "next/link";

export async function getStaticProps(context) {

    const category = await getCategories();

    return {
        props: { category: hydration(category) }, // will be passed to the page component as props
    }
}


function Add(props) {

    const [category,setCategory] = useState(props.category);

    const [body,setBody] = useState({
        title:"",
        body:"",
        category:"",
        short_description:"",
        allowComment: false
    });

    const [message,setMessage] = useState();

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setBody({...body,[name]:value})
    }

    const handleSubmit = (event) => {
        axios
            .post('http://localhost:3000/api/blog/post/',body)
            .then((r) => {
                console.log(r);
                setMessage(r.data);
                !r.data.error && setBody({
                    title:"",
                    body:"",
                    category:"",
                    short_description:"",
                    allowComment: false
                });
            })
    }

    return (
        <Navbar>
            <h1 className="bg-light mb-3 text-center rounded p-2">Add post</h1>
            <hr/>
            {
                message && (
                    <Alerts
                        style={message.error ? "danger":"success"}
                        message={message.error || message.success}
                    />
                )
            }
            <div className="row bg-light rounded p-3 m-1">

                <div className="mb-3">
                    <Input
                        type="text"
                        name={"title"}
                        value={body.title}
                        placeholder={"titre de votre article"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <Select
                        name={"category"}
                        label="category"
                        value={body.category}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        {
                            category.map( c => (
                                <option value={c._id}>{c.title}</option>
                            ))
                        }
                    </Select>
                </div>

                <div className="mb-3">
                    <Textarea
                        label={"content"}
                        name={"body"}
                        value={body.body}
                        row={"3"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <Textarea
                        value={body.short_description}
                        label={"short description"}
                        name={"short_description"}
                        row={"3"}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-check mb-3 ms-3">
                    <Checkbox
                        value={body.allowComment}
                        label="allow comments"
                        name={"allowComment"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <button className="btn btn-danger" onClick={handleSubmit}>Ajouter un article</button>
                    <Link href={"/np-admin/blog/"}>
                        <a className="btn btn-primary ms-2">Retour</a>
                    </Link>

                </div>

            </div>
        </Navbar>
);
}


export default Add;