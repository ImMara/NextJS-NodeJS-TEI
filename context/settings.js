import {createContext} from "react";
import {useState} from "react";
import {useContext} from "react";
import axios from "axios";
import {useEffect} from "react";


const SettingsContext = createContext(undefined, undefined);

export function SettingsWrapper(props){

    const [settings,setSettings] = useState();

    useEffect( ()=>{
        axios.get(`/api/settings`)
            .then((response)=>setSettings(response.data.data))
    },[])

    // console.log(settings)
    return(
        <SettingsContext.Provider value={settings}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export function useSettingsContext(){
    return useContext(SettingsContext);
}