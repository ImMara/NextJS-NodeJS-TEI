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
            .patch(`/api/blog/categories/` + editCategory._id, editCategory)
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
            .post(`/api/blog/categories`, body)
            .then(r => {
                setMessage(r.data);

                if (!r.data.error) {
                    // update locally the state
                    setCategory([...category, r.data.data]);
                    // reset values
                    setBody({
                        title: "",
                        description: ""
                    })
                }
            });

    }

    // Add end

    // Delete start

    // handle delete to db
    const handleDelete = (event) => {
        // delete category in DB
        axios
            .delete(`/api/blog/categories/` + categoryId)
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
                <div className="row">

                    <div className="col-12">
                        <h1>Catégories</h1>
                        <hr/>
                    </div>

                    <div className={"row col-12 mb-3 gx-1"}>
                        <div className="col-12 col-md-3 mb-1">
                            <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addCat">
                                Ajouter une catégorie
                            </button>
                        </div>
                        <div className="col-12 col-md-3 mb-3">
                            <Link href={"/np-admin/blog/"}>
                                <a className={"btn btn-primary w-100"}>Liste des articles</a>
                            </Link>
                        </div>
                        <hr/>
                    </div>

                    <div className="col-12">
                        <Modal
                            target={"addCat"}
                            label={"exampleModalLabel"}
                            title={"Ajouter une catégorie"}
                            btn={"Ajouter"}
                            submit={handleSubmit}
                            color="success"
                        >
                            <div className="mb-3">
                                <Input
                                    name={"title"}
                                    onChange={handleChange}
                                    type={"text"}
                                    label={"Titre"}
                                    value={body.title}
                                />
                            </div>
                            <div className="mb-3">
                                <Textarea
                                    name={"description"}
                                    label={"Description"}
                                    onChange={handleChange}
                                    value={body.description}
                                />
                            </div>
                        </Modal>
                    </div>

                    <div className="col-12">
                        <Modal
                            target={"delete"}
                            label={"exampleModalLabel"}
                            title={"Delete"}
                            btn={"delete"}
                            submit={handleDelete}
                        >
                            are you sure?
                        </Modal>
                    </div>

                    <div className="col-12 col-md-6">
                        <table className="table">
                            <thead>
                            <th>#</th>
                            <th>Titre</th>
                            <td>Actions</td>
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
                                                    }}>Modifier</a>

                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            setCategoryIndex(index);
                                                            setCategoryId(c._id);
                                                        }}
                                                        data-bs-toggle="modal" data-bs-target="#delete"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </>
                                            )}

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-12 col-md-6">
                        {
                            editCategory.title && (
                                <div className="p-3 border-1">
                                    <div className="mb-3">
                                        <Input
                                            name={"title"}
                                            onChange={handleEditChange}
                                            value={editCategory.title}
                                            type={"text"}
                                            label={"Titre"}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Textarea
                                            name={"description"}
                                            label={"Description"}
                                            value={editCategory.description}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div>
                                        <a className="btn btn-success me-1" onClick={handleSubmitEdit}>Modifier</a>
                                        <a className="btn btn-danger" onClick={handleCloseEdit}>Supprimer</a>
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