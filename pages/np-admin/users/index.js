import React, {useState} from 'react';
import {hydration} from "../../../utils/hydration";
import {findAllUsers} from "../../../server/queries/user.queries";
import Layout from "../../../components/layout/Layout";
import Navbar from "../../../components/admin/navbar/Navbar";
import {useAuthContext} from "../../../context/auth";
import Modal from "../../../components/bootstrap-5/modal/Modal";
import Input from "../../../components/bootstrap-5/input/Input";
import Select from "../../../components/bootstrap-5/input/Select";
import {getRoles} from "../../../server/queries/role.queries";
import axios from "axios";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import Link from "next/link";


export async function getServerSideProps(context) {

    const users = await findAllUsers();
    const roles = await getRoles();

    return {
        props: {users: hydration(users) , roles: hydration(roles)}, // will be passed to the page component as props
    }
}


function Index(props) {

    /* START STATE */

    const [authUser,setAuthUser] = useState(useAuthContext())

    const [bodyRole,setBodyRole] = useState({
        title:"",
        access:[],
    });
    const [roles,setRoles] = useState(props.roles);
    const [roleId,setRoleId] = useState(null);
    const [roleIndex,setRoleIndex] = useState(null);

    const [bodyUser,setBodyUser] = useState({
        username: "",
        email: "",
        password: "",
        role:"",
    });
    const [users,setUsers] = useState(props.users);
    const [userId,setUserId] = useState(null);
    const [userIndex,setUserIndex] = useState(null);
    const [userRole,setUserRole] = useState();

    const [message, setMessage] = useState();

    /* END STATE */

    /* START LOGIC */

    // USER

    // handle change user
    const handleChangeUser = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setBodyUser({...bodyUser,[name]:value});
    }

    // handle submit new user
    const handleSubmitUser = (event) => {
        axios
            .post(`/api/users`,bodyUser)
            .then(r =>{
                console.log(r);
                setMessage(r.data);
                if(!r.data.error){
                    // update locally the state
                    setUsers([...users,r.data.data]);
                    // reset values
                    setBodyUser({
                        username:"",
                        email:"",
                        password:"",
                        role:"",
                    })
                }
            })
    }

    // handle delete user
    const handleDelete = (event) => {
        // delete user in db
        axios
            .delete(`/api/users/`+userId)
            .then(r =>{
                console.log(r);
                setMessage(r.data);
                // update state
                users.splice(userIndex, 1);
                // reset values
                setUserIndex(null);
                setUserId(null);
            })
    }

    // handle change user role
    const handleChangeUserRole = async (event,user,index) => {
        const target = await event.target;
        const value = await target.type === 'checkbox' ? target.checked : target.value;
        const name = await target.name;

        axios.patch(`/api/users/`+user._id, {[name]:value})
            .then(r =>{
                users[index] = r.data.data;
                console.log(r);
                setMessage(r.data);
            })
    }

    // END USER

    // ROLE
        // handle change role
        const handleChangeRole = (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            setBodyRole({...bodyRole, [name]: value})
        }

        // handle multi selection
        const handleChangeRoleMulti = (event) =>{
            const target = event.target;
            const name = target.name;
            const options = target.options;
            const selectedOptions = [];

            for(let i = 0; i < options.length; i++) {
                if( options[i].selected ) {
                    selectedOptions.push(options[i].value);
                }
            }

            setBodyRole({...bodyRole, [name]: selectedOptions})

        }

        // handle submit new role
        const handleSubmitNewRole = () =>{
            // post new role to db
            axios
                .post(`/api/settings/role`,bodyRole)
                .then(r => {
                    console.log(r)
                    setMessage(r.data);
                    // update locally the state
                    setRoles([...roles,r.data.data])
                    // reset values
                    setBodyRole({
                        title: "",
                        access:[]
                    })
                })
        }

        // handle delete role
        const handleDeleteRole = () =>{
            // delete role in db
            axios
                .delete(`/api/settings/role/`+roleId)
                .then(r => {
                    console.log(r)
                    setMessage(r.data);
                    // update state
                    roles.splice(roleIndex,1)
                    // reset values
                    setBodyRole({
                        title: "",
                        access:[]
                    })
                    setRoleId(null)
                    setRoleIndex(null)
                })
        }

        // handle update role
        const handleSubmitUpdateRole = (event) => {
            // update the db with body values
            axios
                .patch(`/api/settings/role/`+bodyRole._id,bodyRole)
                .then(r => {
                    console.log(r);
                    setMessage(r.data);
                    // update locally the state
                    roles[roleIndex] = bodyRole;
                    // reset index state
                    setRoleIndex(null);
                    // reset body state
                    setBodyRole({
                        title:"",
                        access:[]
                    })
                })
        }

    // END ROLE

    /* END LOGIC */

    return (
        <>
            <Navbar/>
            <Layout>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <div className="row">

                    <div className="col-12">
                        <h1>Administration des utilisateurs</h1>
                        <hr/>
                    </div>

                    <div className="col-12 col-lg-6">
                        <h2>Utilisateurs</h2>
                        <hr/>
                        <div className="mb-3">
                            <a
                                data-bs-toggle="modal"
                                data-bs-target={"#addUser"}
                                className="btn btn-success"
                            >Ajouter un utilisateur</a>
                        </div>

                        <Modal
                            target={"deleteUser"}
                            title={"Supprimer un utilisateur"}
                            label="exampleModalLabel"
                            btn={"Supprimer"}
                            submit={handleDelete}
                        >Êtes-vous sûr ?</Modal>

                        <Modal
                            target={"addUser"}
                            title={"Ajouter un utilisateur"}
                            label="exampleModalLabel"
                            btn={"Ajouter"}
                            submit={handleSubmitUser}
                            color="success"
                        >
                            <Input
                                type={"email"}
                                name="email"
                                label="Email"
                                onChange={handleChangeUser}
                                value={bodyUser.email}
                            />
                            <Input
                                type="text"
                                name="username"
                                label="Pseudo"
                                onChange={handleChangeUser}
                                value={bodyUser.username}
                            />
                            <Input
                                type="password"
                                name="password"
                                label="Mot de passe"
                                onChange={handleChangeUser}
                                value={bodyUser.password}
                            />
                            <Select
                                label="Rôle"
                                name={"role"}
                                onChange={handleChangeUser}
                                value={bodyUser.role}
                            >
                                <option>unset</option>
                                {roles.map((role,index) =>(
                                    <option value={role._id} key={index}>{role.title}</option>
                                ))}
                            </Select>

                        </Modal>

                        <hr/>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Pseudo</th>
                                <th className={"table-none"}>Email</th>
                                <th className={"table-none"}>Rôle</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user,index) =>(
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.username}</td>
                                        <td className={"table-none"}>{user.local.email}</td>
                                        <td className={"table-none"}>
                                            {
                                                user.delete ? (
                                                    <Select
                                                        Defaultvalue={user.role}
                                                        name={"role"}
                                                        onChange={(event)=>handleChangeUserRole(event,user,index)}
                                                    >
                                                        {roles.map((role,index) =>(
                                                                <option value={role._id} key={index}>{role.title}</option>
                                                            )
                                                        )}
                                                    </Select>
                                                ):(
                                                    <span>admin</span>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                authUser && (
                                                    user._id !== authUser.sub ? (
                                                        user.delete &&(
                                                            <a
                                                                onClick={()=>{
                                                                    setUserId(user._id);
                                                                    setUserIndex(index);
                                                                }}
                                                                className={"btn btn-danger"}
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteUser"
                                                            >Supprimer</a>
                                                        )) : (
                                                        <Link href="/np-admin/profile">
                                                            <a
                                                                className={"btn btn-primary"}
                                                            >Profil</a>
                                                        </Link>
                                                    ))
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-12 col-lg-6">
                        <h2>Rôles </h2>
                        <hr/>
                        <div className="mb-3">
                            <a
                                onClick={()=>{
                                    setBodyRole({
                                        title:"",
                                        access:[]
                                    })
                                }}
                                data-bs-toggle="modal"
                                data-bs-target={"#addRoleModal"}
                                className="btn btn-success"
                            >Ajouter un rôle </a>
                        </div>

                        <Modal
                            target={"addRoleModal"}
                            title={"Ajouter un rôle"}
                            label="exampleModalLabel"
                            btn={"Ajouter"}
                            submit={handleSubmitNewRole}
                            color="success"
                        >
                            <Input
                                label={"Titre du rôle"}
                                type={"text"}
                                name={"title"}
                                value={bodyRole.title}
                                onChange={handleChangeRole}
                            />
                            <Select
                                name={"access"}
                                label={"Accès"}
                                multiple={true}
                                value={bodyRole.access}
                                onChange={handleChangeRoleMulti}
                            >
                                <option value="blog">blog</option>
                                <option value="page">page</option>
                                <option value="menu">menu</option>
                                <option value="users">users</option>
                                <option value="settings">settings</option>
                            </Select>
                        </Modal>

                        <Modal
                            target="updateRole"
                            title="Modifier un rôle"
                            label="update role"
                            btn={"update"}
                            submit={handleSubmitUpdateRole}
                            color="success"
                        >
                            <Input
                                label={"Titre du rôle"}
                                type={"text"}
                                name={"title"}
                                value={bodyRole.title}
                                onChange={handleChangeRole}
                            />
                            <Select
                                name={"access"}
                                label={"Accès"}
                                multiple={true}
                                value={bodyRole.access}
                                onChange={handleChangeRoleMulti}
                            >
                                <option value="Blog">Blog</option>
                                <option value="Page">Page</option>
                                <option value="Menu">Menu</option>
                                <option value="Users">Users</option>
                                <option value="Settings">Settings</option>
                            </Select>
                        </Modal>

                        <Modal
                            target={'deleteRole'}
                            title={"Supprimer un rôle"}
                            label={"delete modal"}
                            btn={"Supprimer"}
                            submit={handleDeleteRole}
                        >
                            Êtes-vous sûr ?
                        </Modal>

                        <hr/>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Rôle</th>
                                <th className={"table-none"}>Accès</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                roles.map((role,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{role.title}</td>
                                        <td className={"table-none"}>{role.access.map( (a,i) => (
                                            <span className={"me-2"} key={i}>{a},</span>
                                        ))}</td>
                                        <td>
                                            {
                                                role.delete && (
                                                    <>
                                                        <button
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#updateRole"
                                                            onClick={()=> {
                                                                setBodyRole(role)
                                                                setRoleIndex(index)
                                                            }}
                                                            className={"btn btn-success"}
                                                        >Modifier</button>
                                                        <a
                                                            onClick={()=> {
                                                                setRoleIndex(index)
                                                                setRoleId(role._id)
                                                            }}
                                                            className={"btn btn-danger"}
                                                            data-bs-toggle="modal" data-bs-target="#deleteRole"
                                                        >Supprimer</a>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>


                </div>

            </Layout>
        </>
    );
}

export default Index;