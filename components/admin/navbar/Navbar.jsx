import React from 'react';
import {useAuthContext} from "../../../context/auth";
import Link from "next/link";
import {updateNavbarContext} from "../../../context/navbar";

const Navbar = (props) => {

    const user = useAuthContext();

    return (
        <>
                    <div className="container mt-5 shadow rounded bg-light">

                        <nav className="navbar navbar-expand-lg border-0 navbar-light bg-light">
                            <div className="container-fluid">
                                <i className="bi bi-arrow-90deg-right d-block d-xxl-none" onClick={updateNavbarContext()}/>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarColor03" aria-controls="navbarColor03"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"/>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarColor03">
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
                                </div>
                            </div>
                        </nav>
                    </div>
    </>
    );
};

export default Navbar;