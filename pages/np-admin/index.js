import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../../components/layout/Layout";
import {findUserPerEmail} from "../../server/queries/user.queries";
import Input from "../../components/bootstrap-5/input/Input";
import {Router,useRouter} from "next/router";
import Alerts from "../../components/bootstrap-5/alerts/Alerts";

export const getServerSideProps = async ({req,res})=>{
    const user = req.user;

    if (user) {
        return {
            redirect: {
                destination: 'np-admin/dashboard',
                permanent: false,
            },
        }
    }
    return { props:{} };
}

function Index(props) {

    const router = useRouter();

    const [body,setBody] = useState({
        email:"",
        password:"",
    })

    const [message,setMessage] = useState('');

    const handleChange= (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setBody({...body, [name]: value})
    }

    const handleSubmit= (event) =>{
        event.preventDefault();
        axios.post('/api/auth/login',body)
            .then((r) =>{
                console.log(r)
                setMessage(r.data);
                if(r.data.success){
                    router.push({
                        path:'/np-admin/dashboard',
                        shallow: true,
                    })
                    // window.location.href="/np-admin/dashboard"
                }
            })
    }

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/dashboard')
    }, [])

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center h-100" style={{minHeight:"100vh"}}>
                <div className="w-50">
                    <Layout>
                        {
                            message && (
                                <Alerts
                                    style={message.error ? "danger" : "success"}
                                    message={message.error || message.success}
                                />
                            )
                        }
                        <div>
                            <h1>Login</h1>
                            <hr/>
                        </div>
                        <div className={"mb-3"}>
                            <form>
                                <div className="mb-3">
                                    <Input
                                        label={"email"}
                                        value={body.email}
                                        type="email"
                                        name={"email"}
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        label={"mot de passe"}
                                        type={"password"}
                                        name={"password"}
                                        value={body.password}
                                        placeholder="votre mot de passe"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className={"btn btn-primary"} onClick={handleSubmit}>Envoyer</button>
                            </form>
                        </div>
                    </Layout>
                </div>
            </div>
        </div>
    );
}


export default Index;