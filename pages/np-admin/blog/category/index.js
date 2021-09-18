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
import Layout from "../../../../components/admin/layout/Layout";
import Link from 'next/link';

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
        <>
             <Navbar/>
            <Layout>
                <h1>Categories</h1>
                <hr/>
                <div className={"mb-3"}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ajouter une catégorie
                    </button>
                    <Link href={"/np-admin/blog/"}>
                        <a className={"btn btn-primary ms-2"}>Liste des articles</a>
                    </Link>
                </div>

                <hr/>

                <Modal
                    target={"exampleModal"}
                    label={"exampleModalLabel"}
                    title={"Modal title"}
                    btn={"Ajouter"}
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
                    <table className="table">
                        <thead>
                            <th>#</th>
                            <th>titre</th>
                            <td>action</td>
                        </thead>
                        <tbody>
                        {category.map((c,index) => (
                            <tr>
                                <td>{index}</td>
                                <td>{c.title}</td>
                                <td>
                                    <a className="btn btn-success">update</a>
                                    <a className="btn btn-danger">supprimer</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

            </Layout>
        </>
    );
}

export default Index;