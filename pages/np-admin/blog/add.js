import React from 'react';
import Navbar from "../../../components/admin/navbar/Navbar";
import {useState} from "react";
import Input from "../../../components/bootstrap-5/input/Input";
import Textarea from "../../../components/bootstrap-5/input/Textarea";
import Select from "../../../components/bootstrap-5/input/Select";
import Checkbox from "../../../components/bootstrap-5/input/Checkbox";
import {getCategories, getCategory} from "../../../server/queries/category.queries";
import axios from "axios";
import Alerts from "../../../components/bootstrap-5/alerts/Alerts";
import {hydration} from "../../../utils/hydration";
import Link from "next/link";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Layout from "../../../components/layout/Layout";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export async function getStaticProps(context) {

    // get all CategoriesWidget from db
    const category = await getCategories();

    return {
        // cleaning the object as json for nextJS hydrate security
        props: {category: hydration(category)}, // will be passed to the page component as props
    }
}


function Add(props) {

    /* START STATE */

    const [category, setCategory] = useState(props.category);
    const [body, setBody] = useState({
        title: "",
        body: "",
        category: "",
        short_description: "",
        allowComment: false
    });
    const [message, setMessage] = useState();
    const [bodyEditor, setBodyEditor] = useState();

    /* END STATE */

    /* START LOGIC */

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setBody({...body, [name]: value})
    }

    const handleBodyEditor = (content) => {
        setBodyEditor(content);
    }

    const handleSubmit = (event) => {
        axios
            .post('http://localhost:3000/api/blog/post/', {...body, body: bodyEditor})
            .then((r) => {
                console.log(r);
                setMessage(r.data);
                if (!r.data.error) {
                    setBody({
                        title: "",
                        body: "",
                        category: "",
                        short_description: "",
                        allowComment: false
                    })
                    setBodyEditor("")
                }
            })
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
                    <h1>Ajouter un article</h1>
                </div>

                <hr/>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger" : "success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <div className="row">

                    <div className="mb-3 col-xl-6">
                        <Input
                            type="text"
                            name={"title"}
                            label={"Titre de l'article"}
                            value={body.title}
                            placeholder={"titre de votre article"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-xl-6">
                        <Select
                            name={"category"}
                            label="Categorie d'article"
                            value={body.category}
                            onChange={handleChange}
                        >
                            <option>Open this select menu</option>
                            {
                                category.map(c => (
                                    <option value={c._id}>{c.title}</option>
                                ))
                            }
                        </Select>
                    </div>

                    <div className="mb-3 col-12">
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

                    <div className="mb-3 col-12">
                        <Textarea
                            value={body.short_description}
                            label={"short description"}
                            name={"short_description"}
                            row={"3"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-check mb-3 ms-3 col-6 d-flex">
                        <div className="me-5">
                            <Checkbox
                                value={body.allowComment}
                                label="allow comments"
                                name={"allowComment"}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Checkbox
                                value={body.status}
                                label="publié"
                                name={"status"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-danger" onClick={handleSubmit}>Ajouter un article</button>
                        <Link href={"/np-admin/blog/"}>
                            <a className="btn btn-primary ms-2">Retour</a>
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}


export default Add;