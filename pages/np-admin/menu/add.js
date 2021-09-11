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
            <label htmlFor="title">
                title
                <input type="text" onChange={handleChange} name={"title"}/>
            </label>
            <label htmlFor="page_id">
                page
                <select name="page_id" id="" onChange={handleChange}>
                    {
                        pages.map((page,index) => (
                            <>
                                <option key={index} value={page._id}>{page.title}</option>
                            </>
                        ))
                    }
                </select>
            </label>
            <label htmlFor="parent">
                parent
                <select name="parent" id="parent">
                    {
                        menus.map((menu,index) => (
                            <>
                                <option key={index} value={menu._id}>{menu.title}</option>
                            </>
                        ))
                    }
                </select>
            </label>
            <a
                onClick={handleSubmit}
                className="btn btn-danger"
            >add</a>
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