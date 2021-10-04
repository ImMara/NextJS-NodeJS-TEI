import React from 'react';
import {useMenuContext} from "../context/menu";
import {useState} from "react";
import LastLayout from "../templates/layouts/LastLayout";
import ContentLayout from "../templates/layouts/ContentLayout";
import Footer from "../templates/components/Footer/Footer";
import Navbar from "../templates/components/Navbar/Navbar";

export default function Index(props) {
    return (
        <>
            <Navbar/>
            <div className="container text-white">
                <LastLayout/>
                <ContentLayout/>
            </div>
            <Footer/>
        </>
    );
}