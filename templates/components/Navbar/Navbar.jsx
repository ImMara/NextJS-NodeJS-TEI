import React from 'react';
import {useMenuContext} from "../../../context/menu";
import Link from 'next/link';

function Navbar(props) {

    const state = useMenuContext();

    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        <Link href={"/"}>
                            <a className="navbar-brand" href="#"><i className="fas fa-blog"/></a>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link href="/">
                                        <a className="nav-link active" aria-current="page" >Home</a>
                                    </Link>
                                </li>
                                {
                                    state && state.map((menu,index)=> (
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href={menu.page_id ? "/"+menu.page_id.slug : "#"}>{menu.title}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;