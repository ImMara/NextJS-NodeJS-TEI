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
            <h3>Laisser un commentaire </h3>
            <small>Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *</small>
            <form className="row g-3 mt-2">
                <div className="col-md-6">
                    <label className="form-label">Nom *</label>
                    <input type="text" name="username" value={body.username} onChange={handleChange} className="form-control bg-dark border-secondary text-white" aria-label="First Name"/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">E-mail *</label>
                    <input type="email" value={body.email} name="email" onChange={handleChange} className="form-control bg-dark border-secondary text-white"/>
                </div>
                <div className="col-12">
                    <label className="form-label">Commentaire *</label>
                    <textarea name="body" value={body.body} onChange={handleChange} className="form-control bg-dark border-secondary text-white" rows="3"/>
                </div>
                <div className="col-12">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Laisser un commentaire</button>
                </div>
            </form>
        </div>
    );
}

export default FormComment;