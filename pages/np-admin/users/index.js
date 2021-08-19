import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {findAllUsers} from "../../../server/queries/user.queries";

function Index(props) {

    return (
        <Navbar user={props.user}>
            <h1>Users</h1>
            <div className="h-25">

                <a href="" className={"btn btn-danger mx-1"}>button</a>
                <a href="" className={"btn btn-danger mx-1"}>button</a>
                <a href="" className={"btn btn-danger mx-1"}>button</a>
            </div>
            <hr/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </Navbar>
    );
}

Index.getInitialProps = async ({req}) => {
    const user = await  req.user;
    const users = await findAllUsers();
    return { user };
}

export default Index;