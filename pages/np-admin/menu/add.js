import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import {getPages} from "../../../server/queries/page.queries";
import axios from "axios";
import {getMenus} from "../../../server/queries/menu.queries";

function Add(props) {

    const [body,setBody] = useState();
    const [pages,setPages] = useState(props.pages);
    const [menus,setMenus] = useState(props.menus);

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        setBody({
            ...body,
            [name]:value
        })

    }

    const handleSubmit = (event) =>{
        axios.post("http://localhost:3000/api/settings/menu",body)
            .then(r => console.log(r));
    }

    return (
        <Navbar>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">title</label>
                <input type="text" className="form-control" id="title" onChange={handleChange} name={"title"}/>
            </div>

            <div className="mb-3">
                <label htmlFor="page_id" className="form-label">page</label>
                <select name="page_id" id="page_id" className="form-control" onChange={handleChange}>
                    {
                        pages.map((page,index) => (
                            <>
                                <option key={index} value={page._id}>{page.title}</option>
                            </>
                        ))
                    }
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="parent" className="form-label">parent</label>
                <select name="parent" onChange={handleChange} className="form-control" id="parent">
                    <option disabled hidden>unset</option>
                    {
                        menus.map((menu,index) => (
                            <>
                                <option key={index} value={menu._id}>{menu.title}</option>
                            </>
                        ))
                    }
                </select>
            </div>

            <div className="mb-3">
                <a
                    onClick={handleSubmit}
                    className="btn btn-danger"
                >add</a>
            </div>

        </Navbar>
    );
}

Add.getInitialProps = async ({req,res}) => {
    const user = req.user;
    const menus = await getMenus();
    const pages = await getPages();
    return { pages , user ,menus};
}

export default Add;