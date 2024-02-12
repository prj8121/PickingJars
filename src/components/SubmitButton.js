import React from "react";

function SubmitButton({handleSubmit, displayString}){

    const buttonStyle = {
        display: 'block',
        position: 'relative',
        margin: '10px auto',
        //border: '2px solid green',
    }

    const disStr = "" + displayString;

    return (
        <div>
            <button 
                style={{height:20, ...buttonStyle}}
                onClick={handleSubmit}
            >
                Submit
            </button>
            <div>
                {disStr}
            </div>
        </div>
    )
}

export default SubmitButton;