import React, {useState} from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {findAllUsers} from "../../../server/queries/user.queries";

function Index(props) {

    const[users,setUsers] = useState(props.users);

    return (
        <Navbar user={props.user}>
            <h1>Users</h1>
            <div className="h-25">

                <a href="users/add" className={"btn btn-danger mx-1"}>add user</a>
                <a href="" className={"btn btn-danger mx-1"}>button</a>
                <a href="" className={"btn btn-danger mx-1"}>button</a>
            </div>
            <hr/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">username</th>
                    <th scope="col">Adresse Email</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>

                { users.map( (element , index) =>(
                    <tr>
                        <th scope="row">1</th>
                        <td>{ element.username }</td>
                        <td>{ element.local.email}</td>
                        <td>@mdo</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </Navbar>
    );
}

Index.getInitialProps = async ({req}) => {
    const user = await  req.user;
    const users = await findAllUsers();
    return { user , users };
}

export default Index;