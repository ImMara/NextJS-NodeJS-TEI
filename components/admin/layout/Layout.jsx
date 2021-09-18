import React from 'react';
import Link from "next/link";
import {useNavbarContext} from "../../../context/navbar";

function Layout(props) {

    return (
        <div className="container">
            <div className="row bg-light shadow rounded p-3 mt-4 mb-5 gy-3 row">
                <div className={
                    useNavbarContext() ?
                        "col-12 col-lg-2 position-sticky row flex-nowrap d-none d-xxl-block bg-light border-end rounded ":
                        "col-12 col-lg-2 position-sticky row flex-nowrap bg-light border-end rounded "
                }>
                    <div className="offcanvas-body px-3">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                            <li>
                                <Link href="/np-admin/dashboard">
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link text-truncate">
                                        <i className="fs-5 bi-speedometer2"/><span
                                        className="ms-1">Dashboard</span> </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/np-admin/page">
                                    <a href="#" className="nav-link text-truncate">
                                        <i className="fs-5 bi-table"/><span className="ms-1">Page</span></a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/np-admin/menu">
                                    <a href="#" className="nav-link text-truncate">
                                        <i className="fs-5 bi-grid"/><span
                                        className="ms-1">Menu</span></a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/np-admin/blog">
                                    <a href="#" className="nav-link text-truncate">
                                        <i className="fs-5 bi-table"/><span className="ms-1 d-none d-sm-inline">Blog</span></a>
                                </Link>
                            </li>

                            <li>
                                <Link href={"/np-admin/users"}>
                                    <a href="#" className="nav-link text-truncate">
                                        <i className="fs-5 bi-people"/><span className="ms-1">Users</span>
                                    </a>
                                </Link>

                            </li>

                            <li>
                                <Link href="/np-admin/settings">
                                    <a href="#" className="nav-link text-truncate">
                                        <i className="fs-5 bi-table"/><span className="ms-1">Settings</span></a>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className={"col ms-2"}>
                    {props.children}
                </div>

            </div>
        </div>
    );
}

export default Layout;