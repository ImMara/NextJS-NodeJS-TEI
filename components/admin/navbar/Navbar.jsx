import React from 'react';
import {useAuthContext} from "../../../context/auth";

const Navbar = (props) => {

    const user = useAuthContext();

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <a href="/np-admin" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2"/> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                            </li>
                            <li>
                                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Pages</span></a>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="page" className="nav-link px-0"> <span className="d-none d-sm-inline">Liste de page</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">item </span> 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                    <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Menu</span></a>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="menu" className="nav-link px-0"> <span className="d-none d-sm-inline">gestion du menu</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Blog</span> </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="blog" className="nav-link px-0"> <span className="d-none d-sm-inline">Liste des articles</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="params" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Site Params</span> </a>
                            </li>
                            <li>
                                <a href="users" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Users</span> </a>
                            </li>
                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1">{ user && user.username
                                }</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><a className="dropdown-item" href="profile">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="/api/auth/logout">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Navbar;