import React from 'react';
import {useAuthContext} from "../../../context/auth";
import Link from "next/link";
import style from "./Navbar.module.css";

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
                                <Link href="/np-admin/page">
                                    <a className="nav-link px-0 align-middle">
                                        <i className="bi bi-file-earmark-break fs-4"/> <span className="ms-1 d-none d-sm-inline">Pages</span></a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/np-admin/menu">
                                    <a className="nav-link px-0 align-middle ">
                                        <i className="bi bi-menu-up fs-4"/><span className="ms-1 d-none d-sm-inline">Menu</span></a>
                                </Link>

                            </li>

                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="bi bi-journals fs-4"/> <span className="ms-1 d-none d-sm-inline">Blog</span> </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link href="/np-admin/blog">
                                            <a className="nav-link px-0"><i className="bi bi-newspaper"/> <span className="d-none d-sm-inline">Articles</span>
                                                </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/np-admin/blog/category">
                                            <a className="nav-link px-0"><i className="fas fa-list-ul fa-1x"/> <span className="d-none d-sm-inline">Category</span>
                                                </a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link href="/np-admin/settings">
                                    <a  className="nav-link px-0 align-middle">
                                        <i className="bi bi-gear fs-4"/> <span className="ms-1 d-none d-sm-inline">Settings</span> </a>
                                </Link>

                            </li>

                            <li>
                                <a href="users" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-people"/> <span className="ms-1 d-none d-sm-inline">Users</span> </a>
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
                                <li><a className="dropdown-item" href="/np-admin/users/">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="/api/auth/logout">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"col py-3 "+style.bg}>
                    <div className="container p-3 mb-3">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow rounded">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">Navbar</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"/>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarColor02">
                                    <ul className="navbar-nav me-auto">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#">Home
                                                <span className="visually-hidden">(current)</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Features</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Pricing</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">About</a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#"
                                               role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                                <div className="dropdown-divider"/>
                                                <a className="dropdown-item" href="#">Separated link</a>
                                            </div>
                                        </li>
                                    </ul>
                                    <form className="d-flex">
                                        <input className="form-control me-sm-2" type="text" placeholder="Search"/>
                                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Navbar;