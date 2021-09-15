import React from 'react';

function Select(props) {
    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <select className="form-select" aria-label={props.default}>
                {props.children}
            </select>
        </>
    );
}

export default Select;