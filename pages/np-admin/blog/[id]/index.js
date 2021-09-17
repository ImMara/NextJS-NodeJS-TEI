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
        body:props.post.body,
        category:props.post.category,
        short_description:props.post.short_description,
        allowComment: props.post.allowComment,
    });

    const [message,setMessage] = useState();
    const [bodyEditor,setBodyEditor] = useState();

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
        axios
            .patch("http://localhost:3000/api/blog/post/"+props.post._id,{...body,body: bodyEditor})
            .then(r => {
                console.log(r)
                setMessage(r.data);
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
        <Navbar>
            <h1 className="bg-light mb-3 text-center rounded p-2">Edit post</h1>
            <hr/>
            {
                message && (
                    <Alerts
                        style={message.error ? "danger":"success"}
                        message={message.error || message.success}
                    />
                )
            }
            <div className="row bg-light rounded p-3 m-1">

                <div className="mb-3">
                    <Input
                        type="text"
                        name={"title"}
                        value={body.title}
                        placeholder={"titre de votre article"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <Select
                        name={"category"}
                        label="category"
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

                <div className="mb-3">
                    <h6>Body</h6>
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

                                ["table", "horizontalRule", "link", "image", "video"],
                                // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                                // ['imageGallery'], // You must add the "imageGalleryUrl".
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                                ["removeFormat"]

                                // ['save', 'template'],
                                // '/', Line break
                            ], // Or Array of button list, eg. [['font', 'align'], ['image']]}
                            defaultTag: "div",
                            minHeight: "300px",
                            showPathLabel: false,
                            font: sortedFontOptions
                        }}
                        autoFocus={true}
                        defaultValue={body.body}
                        onChange={handleBodyEditor}
                        setContents={bodyEditor}
                    />
                </div>

                <div className="mb-3">
                    <Textarea
                        value={body.short_description}
                        label={"short description"}
                        name={"short_description"}
                        row={"3"}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-check mb-3 ms-3">
                    <Checkbox
                        value={body.allowComment}
                        label="allow comments"
                        name={"allowComment"}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <button className="btn btn-danger" onClick={handleSubmit}>Modifier l'article</button>
                    <Link href={"/np-admin/blog/"}>
                        <a className="btn btn-primary ms-2">Retour</a>
                    </Link>
                </div>

            </div>
        </Navbar>
    );
}



export default Index;