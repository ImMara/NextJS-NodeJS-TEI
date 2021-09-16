import React from 'react';
import {useState} from "react";

function Table(props) {

    const [fields,setFields] = useState(props.data);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {
                       Object.keys(fields[0]).map( (key, index) => (
                           <th scope="col" key={index}>{key}</th>
                       ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                  fields.map((field, index) =>(
                      <tr key={index}>
                          <th scope="row" key={index}>{index}</th>
                          { Object.keys(fields[index]).map( (key, i) =>(
                              <td key={i}>{field[key]}</td>
                          ))}
                      </tr>
                  ))
                }
            </tbody>
        </table>
    );
}

export default Table;