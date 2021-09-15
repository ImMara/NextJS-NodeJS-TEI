import React from 'react';

function Checkbox(props) {
    return (
        <>
            <input className="form-check-input" type="checkbox" id={props.name} onChange={props.onChange}/>
                <label className="form-check-label" htmlFor="defaultCheck1">
                    {props.label}
                </label>
        </>
    );
}

export default Checkbox;