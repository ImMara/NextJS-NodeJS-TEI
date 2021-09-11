import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import Table from "../../../components/admin/table/Table";
import {getMenus} from "../../../server/queries/menu.queries";
import {useState} from "react";

function Index(props) {

    const [menus,setMenus] = useState(props.menus);

    return (
        <Navbar>
            <div className="container">
                <h1>Menu</h1>
                <hr/>
                <a href="/np-admin/menu/add" className="btn btn-danger">add</a>
                <hr/>
                    {
                        menus.map( (menu, index) =>(
                            !menu.parent && (
                                <div className="row">
                                    <div key={index} className="col-3 text-center">
                                        <div className="border py-3 mb-3 border-info">
                                            {menu.title}
                                        </div>
                                        {
                                            menus.map((m,i) =>(
                                                m.parent && (
                                                    m.parent._id === menu._id && (
                                                        <div className="mb-3 py-2 ms-4 border border-danger">{m.title}</div>
                                                    )
                                                )
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        ))
                    }
            </div>
        </Navbar>

    );
}

Index.getInitialProps = async ({req,res}) => {
    const user = req.user;
    const menus = await getMenus();

    return {user,menus};
}

export default Index;