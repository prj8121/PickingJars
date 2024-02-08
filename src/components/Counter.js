import React from 'react';

function Counter({info}){

    //console.log(`info:${info}`);
    /*const info = {
        colors: ['red', 'blue'],
        counts: ['3', '4'],
    }*/

    const containerStyle = {
        display: 'flex',
        //border: 'green dotted 2px',

    }
    
    if (info){
        return(
            <div style={containerStyle}>
                {info.colors.map((c, i) => {
                    if (i > 3) console.log(`${i} tiles made`)
                    return (
                        <div key={i} style={{color:c, padding:'3px'}}>
                            {`x${info.counts[i]}`}
                        </div>
                    )
                })}
            </div>
        );
    } else {
        return(
            <div style={containerStyle}>

            </div>
        )
    }
}

export default Counter;