import React from 'react';

function Alerts(props) {

    const alertTypes = () =>{
        switch (props.style) {
            case "danger":
                return "danger";
            case "success":
                return "success";
        }
    }

    return (
        <div className={`alert alert-${alertTypes()}`} role="alert">
            {props.message}
        </div>
    );
}

export default Alerts;