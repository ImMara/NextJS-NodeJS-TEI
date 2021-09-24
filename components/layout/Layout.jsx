import React from 'react';

function Layout(props) {

    return (
        <div className="container">
            <div className="row bg-light shadow rounded p-3 mt-4 mb-5 gy-3 row">
                    {props.children}
            </div>
        </div>
    );
}

export default Layout;