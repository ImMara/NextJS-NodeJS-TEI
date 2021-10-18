import React from 'react';
import Navbar from "../../components/admin/navbar/Navbar";
import Layout from "../../components/layout/Layout";
import Link from "next/link";

function Dashboard(props) {
    return (
        <>
            <Navbar/>
            <Layout>
                <div className="row gy-1 gx-1">
                    <div className="col-12">
                        <h1>dashboard</h1>
                        <hr/>
                    </div>
                    <div className="col-4">
                        <Link href={"/np-admin/blog/"}>

                            <a className="btn btn-primary w-100 p-3"><i className="fab fa-blogger-b me-2"/>Blog</a>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link href={"/np-admin/page/"}>
                            <a className="btn btn-primary w-100 p-3"> <i className="far fa-file me-2"/>Page</a>
                        </Link>

                    </div>
                    <div className="col-4">
                        <Link href={"/np-admin/menu/"}>
                            <a className="btn btn-primary w-100 p-3"><i className="fas fa-ellipsis-h me-2"/>Menu</a>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link href={"/np-admin/users/"}>
                            <a className="btn btn-primary w-100 p-3"><i className="fas fa-users me-2"/>Utilisateurs</a>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link href={"/np-admin/settings/"}>
                            <a className="btn btn-primary w-100 p-3"><i className="fas fa-sliders-h me-2"/>Paramètres</a>
                        </Link>
                    </div>
                    <div className="col-4">
                        <Link href={"/np-admin/profile/"}>
                            <a className="btn btn-primary w-100 p-3"><i className="far fa-id-badge me-2"/>Profil</a>
                        </Link>
                    </div>
                </div>

            </Layout>
        </>
    );
}

export default Dashboard;