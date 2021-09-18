import React from 'react';

function Layout(props) {
    return (
        <div className="container">
            <div className="row bg-light shadow rounded p-3 my-1 g-3">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;