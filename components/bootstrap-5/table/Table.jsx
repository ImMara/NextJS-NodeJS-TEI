import React from 'react';
import {useState} from "react";

function Table(props) {

    const [fields,setFields] = useState(props.data);
    const [keys,setKeys] = useState(Object.keys(fields[0]));
    console.log(Object.keys(fields[0]));
    console.log(keys)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {
                      keys.map( (key, index) => (
                           <th scope="col" key={index}>{key}</th>
                       ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                  fields.map((field, index) =>(
                      <tr key={index}>
                          <th scope="row" key={index}>{index}</th>µ
                          {/*{*/}
                          {/*    keys.map( (key, i) =>(*/}
                          {/*    <td key={i}>{field[key]}</td>*/}
                          {/*       ))*/}
                          {/*}*/}

                      </tr>
                  ))
                }
            </tbody>
        </table>
    );
}

export default Table;