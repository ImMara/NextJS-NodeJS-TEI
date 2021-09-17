import React, {useState} from 'react';
import {useMenuContext} from "../context/menu";

import { Value } from '@react-page/editor';
import Editor from '@react-page/editor';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
import image from '@react-page/images';
const cellPlugins = [slate(), image];

function contact(props) {

    const [value, setValue] = useState(null);

    return (
        <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    );
}
export default contact;