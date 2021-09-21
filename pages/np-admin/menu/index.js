import React, {useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {getMenus} from "../../../server/queries/menu.queries";
import {getPages} from "../../../server/queries/page.queries";
import {hydration} from "../../../utils/hydration";
import Layout from "../../../components/layout/Layout";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import Modal from "../../../components/bootstrap-5/modal/Modal";
import Input from "../../../components/bootstrap-5/input/Input";


export async function getStaticProps(context) {

    const menus = await getMenus();
    const pages = await getPages();

    return {
        props: {menus: hydration(menus), pages: hydration(pages)}, // will be passed to the page component as props
    }
}

function Index(props) {

    const [menus, setMenus] = useState(props.menus);
    const [pages, setPages] = useState(props.pages);
    const [message, setMessage] = useState();

    const [editMenu, setEditMenu] = useState({
        title: "",
        page: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditMenu({...editMenu, [name]: value})
    }

    const handleEdit = (data) => {
        setEditMenu(data)
    }

    const handleSave = () => {

    }

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
                <h1>Menu</h1>
                <hr/>
                <div className={"mb-3"}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCat">
                        Ajouter un liens
                    </button>
                </div>
                <hr/>
                <Modal
                    target={"delete"}
                    label={"exampleModalLabel"}
                    title={"Delete"}
                    btn={"delete"}
                    // submit={handleDelete}
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
                            {
                                menus.map((menu, index) => (
                                    !menu.parent && (
                                        <>
                                            <tr>
                                                <td>{index}</td>
                                                <td>{menu.title}</td>
                                                <td>
                                                    <a onClick={() => handleEdit(menu)}
                                                       className="btn btn-success">Update</a>
                                                    <button
                                                        className="btn btn-danger"
                                                        // onClick={() => {
                                                        //     setCategoryIndex(index);
                                                        //     setCategoryId(c._id)
                                                        // }}
                                                        data-bs-toggle="modal" data-bs-target="#delete"
                                                    >
                                                        delete
                                                    </button>
                                                </td>
                                            </tr>
                                            {
                                                menus.map((m, i) => (
                                                    m.parent && m.parent === menu._id && (
                                                        <tr>
                                                            <td className={"ps-3"}> -> {i}</td>
                                                            <td>{m.title}</td>
                                                            <td>
                                                                <a onClick={() => handleEdit(m)}
                                                                   className="btn btn-success">Update</a>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    // onClick={() => {
                                                                    //     setCategoryIndex(index);
                                                                    //     setCategoryId(c._id)
                                                                    // }}
                                                                    data-bs-toggle="modal" data-bs-target="#delete"
                                                                >
                                                                    delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )))
                                            }
                                        </>
                                    )))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-8">
                        {
                            editMenu.title && (
                                <div className="p-3 border-1">
                                    <div className="mb-3">
                                        <Input
                                            name="title"
                                            onChange={handleChange}
                                            label={"title"}
                                            type="text"
                                            value={editMenu.title}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="page_id" className="form-label">page</label>
                                        <select name="page_id" onChange={handleChange} id="page_id"
                                                className="form-control">
                                            {
                                                pages.map((page, index) => (
                                                    page._id === editMenu.page_id ? (
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
                                        <label htmlFor="parent" className="form-label">parent</label>
                                        <select name="parent" onChange={handleChange} className="form-control"
                                                id="parent">
                                            <option selected={!!editMenu.parent} hidden>unset</option>
                                            {
                                                menus.map((menu, index) => (
                                                    editMenu.parent ? (
                                                        menu._id === editMenu.parent._id ? (
                                                            <option key={index} selected
                                                                    value={menu._id}>{menu.title}</option>
                                                        ) : (
                                                            <option key={index} value={menu._id}>{menu.title}</option>
                                                        )) : (
                                                        <option key={index} value={menu._id}>{menu.title}</option>
                                                    )
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <a className="px-4 btn btn-outline-info">save</a>
                                        <a className="ms-2 px-4 btn btn-danger">close</a>
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