import {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {findUserPerId} from "../server/queries/user.queries";
const jwt = require('jsonwebtoken');

const AuthContext = createContext(undefined);
const UpdateAuthContext = createContext(undefined);

export function AuthWrapper(props){

    let token = Cookies.get('jwt')
    let user = jwt.decode(token)

    console.log(user)

    return(
        <AuthContext.Provider value={user}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}
export function useUpdateAuthContext() {
    return useContext(UpdateAuthContext)
}