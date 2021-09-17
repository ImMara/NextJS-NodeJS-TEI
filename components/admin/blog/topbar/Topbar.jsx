import React from 'react';
import Link from "next/link";

function Topbar(props) {
    return (
        <div className="row g-1">
            <div className="col-6">
                <Link href={"/np-admin/blog/add"}>
                    <a className="btn w-100 btn-primary">Ajouter un article</a>
                </Link>
            </div>
            <div className="col-6">
                <Link href={"/np-admin/blog/category"}>
                    <a className="btn w-100 btn-primary">Category</a>
                </Link>
            </div>
        </div>
    );
}

export default Topbar;