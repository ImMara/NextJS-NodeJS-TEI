import React, {useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {getMenus} from "../../../server/queries/menu.queries";
import {getPages} from "../../../server/queries/page.queries";

function Index(props) {

    const [menus, setMenus] = useState(props.menus);
    const [pages,setPages] = useState(props.pages);

    const [editMenu , setEditMenu] = useState({
        title:"",
        page:"",
    });

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        setEditMenu({...editMenu,[name]:value})
    }

    const handleEdit = (data) => {
        setEditMenu(data)
    }

    const handleSave = () =>{

    }

    return (
        <Navbar>
            <div className="container">
                <h1>Menu</h1>
                <hr/>
                <a href="/np-admin/menu/add" className="btn btn-danger">add</a>
                <hr/>
                <div className="row">
                    <div className="col-3 text-center">
                        {
                            menus.map((menu, index) => (
                                !menu.parent && (
                                    <>
                                        <div key={index} className="border py-3 mb-3 border-info">
                                            {menu.title} <span onClick={()=>handleEdit(menu)} className={"mx-2 btn text-danger"}>Edit</span>
                                        </div>
                                        {
                                            menus.map((m, i) => (
                                                m.parent && (
                                                    m.parent._id === menu._id && (
                                                        <div className="mb-3 py-2 ms-4 border border-danger">
                                                            {m.title} <span onClick={()=>handleEdit(m)} className={"mx-2 btn text-danger"}>Edit</span>
                                                        </div>
                                                    ))))
                                        }
                                    </>
                                )))
                        }
                    </div>
                    <div className="col-9">

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">title</label>
                            <input type="text" onChange={handleChange} className="form-control" id="title" name={"title"} value={editMenu.title}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="page_id" className="form-label">page</label>
                            <select name="page_id" onChange={handleChange} id="page_id" className="form-control">
                                {
                                    pages.map((page,index) => (
                                        page._id === editMenu.page_id ? (
                                                <option key={index} selected value={page._id}>{page.title}</option>
                                            ) : (
                                                <option key={index} value={page._id}>{page.title}</option>
                                            )
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="parent" className="form-label">parent</label>
                            <select name="parent" onChange={handleChange} className="form-control" id="parent">
                                <option selected={!!editMenu.parent} hidden>unset</option>
                                {
                                    menus.map((menu,index) => (
                                        editMenu.parent ? (
                                        menu._id === editMenu.parent._id ?(
                                                <option key={index} selected value={menu._id}>{menu.title}</option>
                                            ):(
                                                <option key={index} value={menu._id}>{menu.title}</option>
                                            )):(
                                            <option key={index} value={menu._id}>{menu.title}</option>
                                        )
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <a className="px-4 btn btn-outline-info">save</a>
                            <a className="ms-2 px-4 btn btn-danger">delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>

    );
}

Index.getInitialProps = async ({req, res}) => {
    const user = req.user;
    const menus = await getMenus();
    const pages = await getPages();

    return {user, menus , pages};
}

export default Index;