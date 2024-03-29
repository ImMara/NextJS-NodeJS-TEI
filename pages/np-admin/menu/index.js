import React, {useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {getMenus} from "../../../server/queries/menu.queries";
import {getPages} from "../../../server/queries/page.queries";
import {hydration} from "../../../utils/hydration";
import Layout from "../../../components/layout/Layout";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import Modal from "../../../components/bootstrap-5/modal/Modal";
import Input from "../../../components/bootstrap-5/input/Input";
import axios from "axios";
import Select from "../../../components/bootstrap-5/input/Select";


export async function getServerSideProps(context) {

    const menus = await getMenus();
    const pages = await getPages();

    return {
        props: {menus: hydration(menus), pages: hydration(pages)}, // will be passed to the page component as props
    }
}

function Index(props) {

    /* START STATE */

    const [menus, setMenus] = useState(props.menus);
    const [pages, setPages] = useState(props.pages);
    const [body,setBody] = useState({
        title: "",
        page_id: "",
    });
    const [menuIndex,setMenuIndex] = useState(null);
    const [menuId,setMenuId] = useState(null);
    const [message, setMessage] = useState();
    const [updateMenu, setUpdateMenu] = useState({
        title: "",
        page_id: "",
    });

    /* END STATE */

    /* START LOGIC */

    // Update start

    // handle edit update state with input value
    const handleUpdateChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUpdateMenu({...updateMenu, [name]: value})
    }

    // handle submit of the update
    const handleSubmitUpdate = (event) => {
        // update the database with update state values
        axios
            .patch(`/api/settings/menu/` + updateMenu._id, updateMenu)
            .then((r) => {
                console.log(r);
                setMessage(r.data);

                if(!r.data.error){
                    // update locally the state
                    menus[menuIndex] = {...menus[menuIndex], ...updateMenu};
                    // reset index state
                    setMenuIndex(null);
                    // reset update state
                    setUpdateMenu({
                        title: "",
                        page_id: "",
                    })
                }
            })
        }
        // handle the close btn and reset values
        const handleCloseUpdate = () => {
            // reset index state
            setMenuIndex(null);
            // reset update state
            setUpdateMenu({
                title: "",
                page_id: "",
            })
        }

        // Update end

        // Add start

        // handle input for new menu
        const handleChange = (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            setBody({...body, [name]: value})
        }

        // handle submit and add new menu to db
        const handleSubmit = (event) => {
            // post new menu to db
            axios
                .post(`/api/settings/menu`,body)
                .then(r =>{
                    console.log(r);
                    setMessage(r.data);
                    if(!r.data.error) {
                        // update locally the state
                        setMenus([...menus, r.data.data]);
                    }
                    // reset values
                    setBody({
                        title: "",
                        page_id: "",
                    })
                })
        }

        // Add end

        // Delete start

        // handle delete to db
        const handleDelete = (event) => {
            // delete menu in db
            axios
                .delete(`/api/settings/menu/`+menuId)
                .then(r =>{
                    console.log(r);
                    setMessage(r.data);
                    // update state
                    menus.splice(menuIndex, 1);
                    // reset values
                    setUpdateMenu({
                        title: "",
                        page: "",
                    })
                    setMenuId(null);
                    setMenuIndex(null);
                })
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
                        <h1>Menu</h1>
                        <hr/>
                    </div>

                    <div className="col-12 row">
                        <div className={"mb-3 col-12 col-md-3"}>
                            <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addMenu">
                                Ajouter un lien
                            </button>
                        </div>
                        <div className="col-12">
                            <hr/>
                        </div>
                    </div>

                    <div className="col-12">
                        <Modal
                            target={"delete"}
                            label={"exampleModalLabel"}
                            title={"Supprimer un menu"}
                            btn={"delete"}
                            submit={handleDelete}
                        >
                            Êtes-vous sûr ?
                        </Modal>
                    </div>

                    <div className="col-12">
                        <Modal
                            target={"addMenu"}
                            label={"exampleModalLabel"}
                            title={"Ajouter un lien"}
                            btn={"Ajouter"}
                            submit={handleSubmit}
                            color={"success"}
                        >
                            <div className="mb-3">
                                <Input
                                    name={"title"}
                                    onChange={handleChange}
                                    type="text"
                                    label={"Titre"}
                                    value={body.title}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    onChange={handleChange}
                                    name={"page_id"}
                                    label={"Page"}
                                    value={body.page_id}
                                >
                                    <option selected value={null}>unset</option>
                                    {
                                        pages.map((page,index) => (
                                            <>
                                                <option key={index} value={page._id}>{page.title}</option>
                                            </>
                                        ))
                                    }
                                </Select>
                            </div>
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
                            {
                                menus.map((menu, index) => (
                                    !menu.parent && (
                                        <>
                                            <tr>
                                                <td>{index}</td>
                                                <td>{menu.title}</td>
                                                <td>
                                                    <div className="row gx-1 gy-1">
                                                        <div className="col-12 col-lg-6">
                                                            <a
                                                                className="btn btn-success w-100"
                                                                onClick={() => {
                                                                    setUpdateMenu(menu);
                                                                    setMenuIndex(index);
                                                                }}>Modifier</a>
                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <button
                                                                className="btn btn-danger w-100"
                                                                onClick={() => {
                                                                    setMenuId(menu._id);
                                                                    setMenuIndex(index);
                                                                }}
                                                                data-bs-toggle="modal" data-bs-target="#delete"
                                                            >Supprimer</button>
                                                        </div>
                                                    </div>


                                                </td>
                                            </tr>
                                        </>
                                    )))
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-12 col-md-6">
                        {
                            updateMenu.title && (
                                <div className="p-3 border-1">
                                    <div className="mb-3">
                                        <Input
                                            name="title"
                                            onChange={handleUpdateChange}
                                            label={"Titre"}
                                            type="text"
                                            value={updateMenu.title}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="page_id" className="form-label">Page</label>
                                        <select name="page_id" onChange={handleChange} id="page_id"
                                                className="form-control">
                                            {
                                                pages.map((page, index) => (
                                                    page._id === updateMenu.page_id ? (
                                                        <option key={index} selected
                                                                value={page._id}>{page.title}</option>
                                                    ) : (
                                                        <option key={index} value={page._id}>{page.title}</option>
                                                    )
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <a
                                            onClick={handleSubmitUpdate}
                                            className="px-4 btn btn-success"
                                        >Modifier</a>
                                        <a
                                            className="ms-2 px-4 btn btn-danger"
                                            onClick={handleCloseUpdate}
                                        >Fermer</a>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </Layout>
        </>

    );
}


export default Index;