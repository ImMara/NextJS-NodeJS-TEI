import React from 'react';

function Footer(props) {
    return (
        <footer className={"bg-dark mt-5 border-top text-white border-secondary"}
            style={{
                padding:"2.5rem 0",
                textAlign:"center",
            }}
        >
            <div className="container">
                <p>Blog template built for NodeJS&NextJS by <a href="https://eraertsalan.be/">Eraerts Alan</a>.</p>
                <p>
                    <a href="#">Back to top</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;