import React from 'react';

function Modal(props) {
    return (
        <div className="modal fade" id={props.target} tabIndex="-1" aria-labelledby={props.label} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={props.label}>{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={props.submit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;