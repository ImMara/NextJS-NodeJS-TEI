import React from 'react';
import {getMenus} from "../server/queries/menu.queries";
import {useState} from "react";

function Index(props) {

  const [menus , setMenus] = useState(props.menus);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                  menus.map((menu,index)=>(
                      menu.page_id && (
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href={menu.page_id.slug}>{menu.title}</a>
                      </li>
                      )
                  ))
                }
              </ul>
            </div>
          </div>
        </nav>
    );
}

Index.getInitialProps = async ({req,res}) => {
  const menus = await getMenus();
  return {menus};
}

export default Index;