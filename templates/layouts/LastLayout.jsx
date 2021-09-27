import React from 'react';
import FullCard from "../components/FullCard/FullCard";

function LastLayout(props) {
    return (
        <div className={"row g-4 pt-4 pb-4"}>

            <div className="col-lg-6">
                <FullCard height="100%"/>
            </div>

            <div className="col-lg-6">
                <div className="row g-4">
                    <div className="col-12">
                        <FullCard height="320px"/>
                    </div>
                    <div className="col-6">
                        <FullCard height="220px"/>
                    </div>
                    <div className="col-6">
                        <FullCard height="220px"/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LastLayout;