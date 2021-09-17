import React from 'react';

function Textarea(props) {
    return (
        <>
            <label
                htmlFor={props.name}
                className="form-label"
            >{props.label}</label>
            <textarea
                onChange={props.onChange}
                name={props.name}
                value={props.value}
                className="form-control"
                id={props.name}
                rows={props.row}
            />
        </>
    );
}

export default Textarea;