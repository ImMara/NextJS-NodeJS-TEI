import React, {useState} from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

function contact(props) {

    const [value, setValue] = useState(null);

    const handleChange = (content) =>{
        console.log(content);
        setValue(content)
        console.log({value});
    }

    return (
        <>
            <h1>wa</h1>
            <div className="container">
                <div className="row gx-1">
                    <div className="col-8">

                    </div>
                </div>
            </div>
        </>

    );
}
export default contact;