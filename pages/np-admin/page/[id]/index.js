import React, {useState} from 'react';
import Navbar from "../../../../components/admin/navbar/Navbar";
import Alerts from "../../../../components/bootstrap-5/alerts/Alerts";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Input from "../../../../components/bootstrap-5/input/Input";
import Layout from "../../../../components/layout/Layout";
import {getMenus} from "../../../../server/queries/menu.queries";
import {getPage} from "../../../../server/queries/page.queries";
import {hydration} from "../../../../utils/hydration";
import axios from "axios";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export async function getServerSideProps(context) {

    const id = context.params.id;

    const page = await getPage(id);

    return {
        props: { page:hydration(page) }, // will be passed to the page component as props
    }
}

function Index(props) {

    const [message,setMessage] = useState("");
    const [body, setBody] = useState(props.page);
    const [bodyEditor, setBodyEditor] = useState();

    const handleBodyEditor = (content) => {
        setBodyEditor(content);
    }

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setBody({
            ...body,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        axios
            .patch(`/api/page/`+props.page._id,{...body,body:bodyEditor})
            .then((r) => {
                console.log(r);
                setMessage(r.data);
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
                <h1>modifier une page</h1>

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
                    value={body.title}
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
                    defaultValue={body.body}
                    />
                    </div>

                    <a
                    className="btn btn-success"
                    onClick={handleSubmit}
                    >Update</a>
            </div>
            </Layout>
        </>
    );
}

export default Index;