import {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {getCategories} from "../server/queries/category.queries";
import {hydration} from "../utils/hydration";

const MenuContext = createContext();

export function MenuWrapper(props){

    const [menu,setMenu] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/settings/menu')
            .then(r => {
                setMenu(r.data.data);
            });
    },[])

    return(
        <MenuContext.Provider value={menu}>
            {props.children}
        </MenuContext.Provider>
    )
}

export function useMenuContext() {
    return useContext(MenuContext);
}