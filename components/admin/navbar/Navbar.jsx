import React from 'react';
import {useAuthContext} from "../../../context/auth";
import Link from "next/link";

const Navbar = (props) => {

    const user = useAuthContext();

    return (
        <>
                    <div className="container mt-5 shadow rounded bg-light">

                        <nav className="navbar navbar-expand-lg border-0 navbar-light bg-light">
                            <div className="container-fluid">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"/>
                                </button>
                                <div className="collapse navbar-collapse"  id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto">

                                        <li className="nav-item">
                                            <Link href="/np-admin/dashboard">
                                                <a className="nav-link" >Dashboard</a>
                                            </Link>
                                        </li>

                                        {
                                           user && user.role.access.includes('blog') && (
                                                <li className="nav-item">
                                                    <Link href="/np-admin/blog">
                                                        <a className="nav-link" >Blog</a>
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        {
                                            user && user.role.access.includes('page') && (
                                                <li className="nav-item">
                                                    <Link href="/np-admin/page">
                                                        <a className="nav-link" >Page</a>
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        {
                                            user && user.role.access.includes('menu') && (
                                                <li className="nav-item">
                                                    <Link href="/np-admin/menu">
                                                        <a className="nav-link" >Menu</a>
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        {
                                            user && user.role.access.includes('users') && (
                                                <li className="nav-item">
                                                    <Link href="/np-admin/users">
                                                        <a className="nav-link" >Users</a>
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        {
                                            user && user.role.access.includes('settings') && (
                                                <li className="nav-item">
                                                    <Link href="/np-admin/settings">
                                                        <a className="nav-link" >Settings</a>
                                                    </Link>
                                                </li>
                                            )
                                        }

                                    </ul>

                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown ">
                                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#"
                                               role="button" aria-haspopup="true" aria-expanded="false">{user && user.username}</a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="/np-admin/profile">Profile</a>
                                                <div className="dropdown-divider"/>
                                                <a className="dropdown-item" href="/api/auth/logout">Logout</a>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </nav>
                    </div>
    </>
    );
};

export default Navbar;