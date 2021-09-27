import React from 'react';

function Footer(props) {
    return (
        <footer className={"bg-dark mt-5 border-top  border-secondary"}
            style={{
                padding:"2.5rem 0",
                textAlign:"center",
            }}
        >
            <div className="container">
                <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                <p>
                    <a href="#">Back to top</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;