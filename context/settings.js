import {createContext} from "react";
import {useState} from "react";
import {useContext} from "react";
import axios from "axios";
import {useEffect} from "react";


const SettingsContext = createContext(undefined, undefined);

export function SettingsWrapper(props){

    const [settings,setSettings] = useState();

    useEffect( ()=>{
        axios.get('http://141.94.220.5:80/api/settings')
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