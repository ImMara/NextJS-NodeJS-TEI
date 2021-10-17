import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import axios from "axios";
import Input from "../../../components/bootstrap-5/input/Input";
import Layout from "../../../components/layout/Layout";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Link from "next/link";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

function Add(props) {

    const [body, setBody] = useState({
        title: "",
        body: {},
        category: "",
        short_description: "",
        allowComment: false,
        status:false,
        featured:false,
    });

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setBody({
            ...body,
            [name]: value
        })
    }

    const [message, setMessage] = useState();
    const [bodyEditor, setBodyEditor] = useState();

    const handleBodyEditor = (content) => {
        setBodyEditor(content);
    }

    const handleSubmit = async () => {
        axios
            .post(`/api/page`, {...body,body:bodyEditor})
            .then(r => setMessage(r.data))
    }

    const defaultFonts = [
        "Arial",
        "Comic Sans MS",
        "Courier New",
        "Impact",
        "Georgia",
        "Tahoma",
        "Trebuchet MS",
        "Verdana"
    ];

    const sortedFontOptions = [
        "Logical",
        "Salesforce Sans",
        "Garamond",
        "Sans-Serif",
        "Serif",
        "Times New Roman",
        "Helvetica",
        ...defaultFonts
    ].sort();

    return (
        <>
            <Navbar/>
            <Layout>

                <div className="mb-3 col row">
                    <h1>Ajouter une page</h1>
                </div>

                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <hr/>
                <Input
                    label="title"
                    name={"title"}
                    type={"text"}
                    onChange={handleChange}
                />
                <div className="mb-3">
                    <h6 className="mb-2 py-1">Contenus de l'article</h6>
                    <SunEditor
                        lang="fr"
                        name="body"
                        placeholder="Please type here..."
                        setOptions={{
                            buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ['paragraphStyle', 'blockquote'],
                                [
                                    "bold",
                                    "underline",
                                    "italic",
                                    "strike",
                                    "subscript",
                                    "superscript"
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "list", "lineHeight"],
                                ["outdent", "indent"],

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                // ['imageGallery'], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"],

                                // ['save', 'templates'],
                                // '/', //Line break
                            ], // Or Array of button list, eg. [['font', 'align'], ['image']]}
                            defaultTag: "div",
                            minHeight: "300px",
                            showPathLabel: false,
                            font: sortedFontOptions,
                            imageSizeOnlyPercentage: true,
                        }}
                        setContents={bodyEditor}
                        autoFocus={true}
                        onChange={handleBodyEditor}
                        height="500"
                    />
                </div>
                <div>
                    <a
                        className="btn btn-success"
                        onClick={handleSubmit}
                    >Ajouter une page</a>
                    <Link href={"/np-admin/page/"}>
                        <a className="btn ms-1 btn-primary">
                            retour
                        </a>
                    </Link>
                </div>

            </Layout>

        </>
    );

}

export default Add;