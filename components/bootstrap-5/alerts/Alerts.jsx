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
        <div className={`alert alert-${alertTypes()} alert-dismissible fade show`} role="alert">
            {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"/>
        </div>
    );
}

export default Alerts;