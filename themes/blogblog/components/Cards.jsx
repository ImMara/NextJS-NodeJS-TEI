import React from 'react';

function Cards(props) {
    return (
        <div className={"card card-overlay-bottom card-grid-sm card-bg-scale"} style={{
            backgroundImage: "url(\'http://placekitten.com/g/200/300\') ",
            height: '400px',
            backgroundPosition: "center left", backgroundSize: "cover",
        }}>

        </div>
    );
}

export default Cards;