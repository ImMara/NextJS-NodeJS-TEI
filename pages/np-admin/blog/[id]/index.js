import React from 'react';
import Navbar from "../../../../components/admin/navbar/Navbar";
import Alerts from "../../../../components/bootstrap-5/alerts/Alerts";
import Input from "../../../../components/bootstrap-5/input/Input";
import Select from "../../../../components/bootstrap-5/input/Select";
import Textarea from "../../../../components/bootstrap-5/input/Textarea";
import Checkbox from "../../../../components/bootstrap-5/input/Checkbox";
import Link from "next/link";
import {getCategories} from "../../../../server/queries/category.queries";
import {hydration} from "../../../../utils/hydration";
import {useState} from "react";
import {getPost} from "../../../../server/queries/post.queries";
import axios from "axios";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Layout from "../../../../components/layout/Layout";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export async function getServerSideProps(context) {

    const id = context.params.id;

    const category = await getCategories();

    const post = await getPost(id);

    return {
        props: { category: hydration(category) , post : hydration(post) }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [category,setCategory] = useState(props.category);

    const [body,setBody] = useState({
        title:props.post.title,
        category:props.post.category,
        short_description:props.post.short_description,
        allowComment: props.post.allowComment,
        status:props.post.status,
        featured:props.post.featured,
    });
    const [fileSelected,setFileSelected] = useState();

    const [message,setMessage] = useState();
    const [bodyEditor,setBodyEditor] = useState(props.post.body);

    const handleFile = (event) =>{
        setFileSelected(event.target.files[0])
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setBody({...body,[name]:value})
    }

    const handleBodyEditor = (content) =>{
        setBodyEditor(content);
    }

    const handleSubmit = (event) => {

        let formData = new FormData();

        for(const key in body){
            formData.append(key,body[key]);
        }

        formData.append('body',bodyEditor);
        formData.append('image',fileSelected);

        axios
            .patch(`/api/blog/post/${props.post._id}`, formData)
            .then(r => {
                setMessage(r.data);
                console.log(r.data);
            });
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
                <h1 className="bg-light mb-3 rounded p-2">Edition de l'article {props.post.title}</h1>
                <hr/>
                {
                    message && (
                        <Alerts
                            style={message.error ? "danger":"success"}
                            message={message.error || message.success}
                        />
                    )
                }
                <div className="row">

                    <div className="mb-3 col-xl-6">
                        <Input
                            type="text"
                            name={"title"}
                            label={"Titre"}
                            value={body.title}
                            placeholder={"titre de votre article"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-xl-6">
                        <Select
                            name={"category"}
                            label="Catégorie"
                            value={body.category}
                            onChange={handleChange}
                        >
                            <option>Open this select menu</option>
                            {
                                category.map( (c,i) => (
                                    <option key={i} value={c._id}>{c.title}</option>
                                ))
                            }
                        </Select>
                    </div>

                    <div className="col-12 mb-3">
                        <Input
                            type="file"
                            name={"image"}
                            onChange={handleFile}
                            label="Image"
                        />
                    </div>

                    <div className="mb-3 col-12">
                        <h6 className="mb-2 py-1">Contenu de l'article</h6>
                        <SunEditor
                            lang="fr"
                            name="body"
                            height="500"
                            placeholder="Please type here..."
                            setOptions={{
                                buttonList: [
                                    ["undo", "redo"],
                                    ["font", "fontSize"],
                                    // ['paragraphStyle', 'blockquote'],
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

                                    ["table", "horizontalRule", "link", "video"],
                                    // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                    // ['imageGallery'], // You must add the "imageGalleryUrl".
                                    ["fullScreen", "showBlocks", "codeView"],
                                    ["preview", "print"],
                                    ["removeFormat"]

                                    // ['save', 'templates'],
                                    // '/', Line break
                                ], // Or Array of button list, eg. [['font', 'align'], ['image']]}
                                defaultTag: "div",
                                minHeight: "300px",
                                showPathLabel: false,
                                font: sortedFontOptions,
                                imageSizeOnlyPercentage: true,
                            }}
                            autoFocus={true}
                            onChange={handleBodyEditor}
                            DefaultValue={props.post.body}
                            setContents={bodyEditor}
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

                    <div className="form-check mb-3 ms-3 col-6 row">
                        <div className="col-12">
                            <Checkbox
                                value={body.allowComment}
                                label="Commentaires"
                                name={"allowComments"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <Checkbox
                                value={body.status}
                                label="Publier"
                                name={"status"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <Checkbox
                                value={body.featured}
                                label="En vedette"
                                name={"featured"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-success" onClick={handleSubmit}>Modifier l'article</button>
                        <Link href={"/np-admin/blog/"}>
                            <a className="btn btn-primary ms-2">Retour</a>
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}



export default Index;