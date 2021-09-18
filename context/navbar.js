import {createContext, useContext, useState} from 'react';

const NavbarContext = createContext();
const UpdateNavbarContext = createContext();
export function NavbarWrapper(props){

    const [show,setShow] = useState(false);

    const switchShow = () => setShow(!show);

    return(
        <NavbarContext.Provider value={show}>
            <UpdateNavbarContext.Provider value={switchShow}>
                {props.children}
            </UpdateNavbarContext.Provider>
        </NavbarContext.Provider>
    )
}

export function useNavbarContext() {
    return useContext(NavbarContext);
}
export function updateNavbarContext(){
    return useContext(UpdateNavbarContext);
}