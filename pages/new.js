import React from 'react';
import fs from 'fs';
import {hydration} from "../utils/hydration";
import Cards from "../themes/blogblog/components/Cards";

export const getServerSideProps = async ({req,res})=>{
    const user = req.user;

    const files = fs.readdirSync("./themes/blogblog/layout/")

    for (const file of files) {
        console.log(file)
    }

    console.log(user)

    return { props:{} };
}

function New(props) {

    return (
        <div className="mt-5 container">
            <div className={"row g-1"}>
                <div className="col-6">
                    <Cards/>
                </div>
            </div>
        </div>
    );
}

export default New;