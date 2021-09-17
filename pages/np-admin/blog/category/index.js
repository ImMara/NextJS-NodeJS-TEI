import React from 'react';
import Navbar from "../../../../components/admin/navbar/Navbar";
import {getCategories} from "../../../../server/queries/category.queries";
import Modal from "../../../../components/bootstrap-5/modal/Modal";
import Input from "../../../../components/bootstrap-5/input/Input";
import Textarea from "../../../../components/bootstrap-5/input/Textarea";
import {useState} from "react";
import axios from "axios";
import {getPosts} from "../../../../server/queries/post.queries";
import {hydration} from "../../../../utils/hydration";

export async function getStaticProps(context) {

    const category = await getCategories();

    return {
        props: { category: hydration(category) }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [category,setCategory] = useState(props.category);
    const [body,setBody] = useState();

    const handleChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setBody({...body,[name]:value})
    }

    const handleSubmit = (event) => {
        axios.post("http://localhost:3000/api/blog/categories",body)
            .then(r=> console.log(r));
        setCategory([...category,body]);
    }

    return (
        <Navbar>

            <h1>Categories</h1>

            <hr/>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <hr/>

            <Modal
                target={"exampleModal"}
                label={"exampleModalLabel"}
                title={"Modal title"}
                submit={handleSubmit}
            >
                <div className="mb-3">
                    <Input
                        name={"title"}
                        onChange={handleChange}
                        type={"text"}
                        label={"title"}
                    />
                </div>
                <div className="mb-3">
                    <Textarea
                        name={"description"}
                        label={"description"}
                        onChange={handleChange}
                    />
                </div>
            </Modal>

            <div className="row">
                <div className="col-6">
                    {category.map(c => (
                        <div>
                            <h1>{c.title}</h1>
                            <p>{c.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Navbar>
    );
}

export default Index;