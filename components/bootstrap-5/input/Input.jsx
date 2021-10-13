import React from 'react';

function Input(props) {

    return (
        <>
            <label
                htmlFor={props.name}
                className="form-label"
            >{props.label}</label>
            <input
                type={props.type}
                onChange={props.onChange}
                className="form-control"
                id={props.name}
                defaultValue={props.defaultValue}
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
                aria-describedby={props.label}
            />
            {
                props.labelText && (
                    <div
                        id={props.labelText}
                        className="form-text"
                    >{props.labelText}</div>
                )
            }
        </>
    );
}

export default Input;