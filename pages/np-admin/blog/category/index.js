import React, {useState} from 'react';
import Navbar from "../../../../components/admin/navbar/Navbar";
import {getCategories} from "../../../../server/queries/category.queries";
import Modal from "../../../../components/bootstrap-5/modal/Modal";
import Input from "../../../../components/bootstrap-5/input/Input";
import Textarea from "../../../../components/bootstrap-5/input/Textarea";
import axios from "axios";
import {hydration} from "../../../../utils/hydration";
import Layout from "../../../../components/layout/Layout";
import Link from 'next/link';
import Alerts from "../../../../components/bootstrap-5/alerts/Alerts";

export async function getStaticProps(context) {

    // DB call to get all CategoriesWidget
    const category = await getCategories();

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {category: hydration(category)}, // will be passed to the page component as props
    }
}

function Index(props) {

    /* START STATE */

    const [category, setCategory] = useState(props.category);
    const [body, setBody] = useState({
        title: "",
        description: ""
    });
    const [editCategory, setEditCategory] = useState({
        title: "",
        description: "",
    });
    const [categoryIndex, setCategoryIndex] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [message, setMessage] = useState();

    /* END STATE */

    /* START LOGIC */

    // Edit start

    // handle update state with input value
    const handleEditChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setEditCategory({...editCategory, [name]: value})
    }

    // handle submit of the update
    const handleSubmitEdit = (event) => {
        // update the database with edit state values
        axios
            .patch('http://localhost:3000/api/blog/categories/' + editCategory._id, editCategory)
            .then((r) => {
                console.log(r)
                setMessage(r.data);
                // update locally the state
                category[categoryIndex] = editCategory;
                // reset index state
                setCategoryIndex(null)
                // reset edit state
                setEditCategory({
                    title: "",
                    description: "",
                })
            })
    }

    // handle the close btn and reset the values
    const handleCloseEdit = () => {
        // reset index state
        setCategoryIndex(null)
        // reset edit state
        setEditCategory({
            title: "",
            description: "",
        })
    }

    // Edit end

    // Add start

    // handle input changes for new category
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setBody({...body, [name]: value})
    }

    // handle submit and add new category to db
    const handleSubmit = (event) => {
        // post new category to db
        axios
            .post("http://localhost:3000/api/blog/categories", body)
            .then(r => {
                console.log(r)
                setMessage(r.data);
                // update locally the state
                setCategory([...category, body]);
                // reset values
                setBody({
                    title: "",
                    description: ""
                })
            });

    }

    // Add end

    // Delete start

    // handle delete to db
    const handleDelete = (event) => {
        // delete category in DB
        axios
            .delete("http://localhost:3000/api/blog/categories/" + categoryId)
            .then(r => {
                console.log(r)
                setMessage(r.data);
                // update state
                category.splice(categoryIndex, 1)
                // reset values
                setEditCategory({
                    title: "",
                    description: "",
                })
                setCategoryId(null)
                setCategoryIndex(null)
            });
    }

    // Delete end

    /* END LOGIC */

    return (
        <>
            <Navbar/>
            <Layout>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <h1>Categories</h1>
                <hr/>
                <div className={"mb-3"}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCat">
                        Ajouter une catégorie
                    </button>
                    <Link href={"/np-admin/blog/"}>
                        <a className={"btn btn-primary ms-2"}>Liste des articles</a>
                    </Link>
                </div>

                <hr/>

                <Modal
                    target={"addCat"}
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
                            value={body.title}
                        />
                    </div>
                    <div className="mb-3">
                        <Textarea
                            name={"description"}
                            label={"description"}
                            onChange={handleChange}
                            value={body.description}
                        />
                    </div>
                </Modal>

                <Modal
                    target={"delete"}
                    label={"exampleModalLabel"}
                    title={"Delete"}
                    btn={"delete"}
                    submit={handleDelete}
                >
                    are you sure?
                </Modal>

                <div className="row">
                    <div className="col-4">
                        <table className="table">
                            <thead>
                            <th>#</th>
                            <th>titre</th>
                            <td>action</td>
                            </thead>
                            <tbody>
                            {category.map((c, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{c.title}</td>
                                    <td>
                                        {
                                            c._id && (
                                                <>
                                                    <a className="btn btn-success" onClick={() => {
                                                        setEditCategory(c);
                                                        setCategoryIndex(index)
                                                    }}>update</a>

                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            setCategoryIndex(index);
                                                            setCategoryId(c._id);
                                                        }}
                                                        data-bs-toggle="modal" data-bs-target="#delete"
                                                    >
                                                        delete
                                                    </button>
                                                </>
                                            )}

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-8">
                        {
                            editCategory.title && (
                                <div className="p-3 border-1">
                                    <div className="mb-3">
                                        <Input
                                            name={"title"}
                                            onChange={handleEditChange}
                                            value={editCategory.title}
                                            type={"text"}
                                            label={"title"}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Textarea
                                            name={"description"}
                                            label={"description"}
                                            value={editCategory.description}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div>
                                        <a className="btn btn-success" onClick={handleSubmitEdit}>Save</a>
                                        <a className="btn btn-danger" onClick={handleCloseEdit}>Close</a>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Index;