import React from 'react';
import FullCard from "../components/FullCard/FullCard";

function LastLayout(props) {
    return (
        <div className={"row g-4 pt-4 pb-4 mb-5"}>

            <div className="col-lg-6">
                <FullCard image={"https://picsum.photos/260/300"} height="100%"/>
            </div>

            <div className="col-lg-6">
                <div className="row g-4">
                    <div className="col-12">
                        <FullCard short={true} image={"https://picsum.photos/210/300"} height="320px"/>
                    </div>
                    <div className="col-6">
                        <FullCard short={true} image={"https://picsum.photos/200/310"} height="220px"/>
                    </div>
                    <div className="col-6">
                        <FullCard short={true} image={"https://picsum.photos/200/320"} height="220px"/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LastLayout;