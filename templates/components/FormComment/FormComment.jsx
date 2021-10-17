import React, {useState} from 'react';
import Input from "../../../components/bootstrap-5/input/Input";
import axios from "axios";

function FormComment(props) {

    const [body,setBody] = useState({
        body:"",
        email:"",
        post_id:props.id,
        username:"",
    });

    const changeComment = (data) =>{
        props.setComments(data);
    }

    const handleChange = (event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setBody({...body, [name]: value})
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios
            .post('/api/blog/comments',body)
            .then(r => {
                console.log(r.data);
                changeComment([...props.comments,r.data.data]);
                setBody({
                    body:"",
                    email:"",
                    post_id:props.id,
                    username:"",
                })
            })
    }

    return (
        <div>
            <h3>Leave a reply</h3>
            <small>Your email address will not be published. Required fields are marked *</small>
            <form className="row g-3 mt-2">
                <div className="col-md-6">
                    <label className="form-label">Name *</label>
                    <input type="text" name="username" value={body.username} onChange={handleChange} className="form-control bg-dark border-secondary text-white" aria-label="First Name"/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input type="email" value={body.email} name="email" onChange={handleChange} className="form-control bg-dark border-secondary text-white"/>
                </div>
                <div className="col-12">
                    <label className="form-label">Your Comment *</label>
                    <textarea name="body" value={body.body} onChange={handleChange} className="form-control bg-dark border-secondary text-white" rows="3"/>
                </div>
                <div className="col-12">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Post comment</button>
                </div>
            </form>
        </div>
    );
}

export default FormComment;