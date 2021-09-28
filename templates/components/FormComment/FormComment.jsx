import React from 'react';
import Input from "../../../components/bootstrap-5/input/Input";

function FormComment(props) {
    return (
        <div>
            <h3>Leave a reply</h3>
            <small>Your email address will not be published. Required fields are marked *</small>
            <form className="row g-3 mt-2">
                <div className="col-md-6">
                    <label className="form-label">Name *</label>
                    <input type="text" className="form-control bg-dark border-secondary text-white" aria-label="First Name"/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-control bg-dark border-secondary text-white"/>
                </div>
                <div className="col-12">
                    <label className="form-label">Your Comment *</label>
                    <textarea className="form-control bg-dark border-secondary text-white" rows="3"/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Post comment</button>
                </div>
            </form>
        </div>
    );
}

export default FormComment;