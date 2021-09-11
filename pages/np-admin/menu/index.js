import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/admin/table/Table";
import {getMenus} from "../../../server/queries/menu.queries";
import {useState} from "react";

function Index(props) {

    const [menus,setMenus] = useState(props.menus);

    return (
        <Navbar>
            <h1>Menu</h1>
            <a href="/np-admin/menu/add" className="btn btn-danger">add</a>
            {
                menus.map( (menu, index) =>(
                    <div key={index}>
                        <h1>{menu.title}</h1>
                    </div>
                ))
            }
        </Navbar>

    );
}

Index.getInitialProps = async ({req,res}) => {
    const user = req.user;
    const menus = await getMenus();

    return {user,menus};
}

export default Index;