import React from 'react';

function Select(props) {
    return (
        <>
            <label
                htmlFor={props.name}
            >{props.label}</label>
            <select
                className="form-select"
                onChange={props.onChange}
                aria-label={props.default}
                name={props.name}
                value={props.value}
            >
                {props.children}
            </select>
        </>
    );
}

export default Select;