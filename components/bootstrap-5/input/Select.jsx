import React from 'react';

function Select(props) {
    return (
        <>
            {
                props.label && (
                    <label
                        htmlFor={props.name}
                        className="form-label"
                    >{props.label}</label>
                )
            }
            <select
                multiple={props.multiple}
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