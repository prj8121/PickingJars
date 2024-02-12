import React from "react";

function SubmitButton(handleSubmit){

    const buttonStyle = {
        display: 'block',
        position: 'relative',
        margin: '10px auto',
        //border: '2px solid green',
    }

    return (
        <div>
            <button 
                style={{height:20, ...buttonStyle}}
                onClick={handleSubmit}
            >
                This is the submit button
            </button>
            <div>
                And this is the display block of the submit button
            </div>
        </div>
    )
}

export default SubmitButton;