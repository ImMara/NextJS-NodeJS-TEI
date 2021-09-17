import React from 'react';
import Navbar from "../../../../components/admin/navbar/Navbar";
import Alerts from "../../../../components/bootstrap-5/alerts/Alerts";
import Input from "../../../../components/bootstrap-5/input/Input";
import Select from "../../../../components/bootstrap-5/input/Select";
import Textarea from "../../../../components/bootstrap-5/input/Textarea";
import Checkbox from "../../../../components/bootstrap-5/input/Checkbox";
import Link from "next/link";
import {getCategories} from "../../../../server/queries/category.queries";
import {hydration} from "../../../../utils/hydration";
import {useState} from "react";
import {getPost} from "../../../../server/queries/post.queries";
import axios from "axios";

export async function getServerSideProps(context) {

    const id = context.params.id;

    const category = await getCategories();

    const post = await getPost(id);

    return {
        props: { category: hydration(category) , post : hydration(post) }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [category,setCategory] = useState(props.category);

    const [body,setBody] = useState({
        title:props.post.title,
        body:props.post.body,
        category:props.post.category,
        short_description:props.post.short_description,
        allowComment: props.post.allowComment,
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
            .patch("http://localhost:3000/api/blog/post/"+props.post._id,body)
            .then(r => {
                console.log(r)
                setMessage(r.data);
            });
    }

    return (
        <Navbar>
            <h1 className="bg-light mb-3 text-center rounded p-2">Edit post</h1>
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
                            category.map( (c,i) => (
                                <option key={i} value={c._id}>{c.title}</option>
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
                    <button className="btn btn-danger" onClick={handleSubmit}>Modifier l'article</button>
                    <Link href={"/np-admin/blog/"}>
                        <a className="btn btn-primary ms-2">Retour</a>
                    </Link>
                </div>

            </div>
        </Navbar>
    );
}



export default Index;