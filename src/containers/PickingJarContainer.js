import React, { useState, useEffect, useRef } from 'react';
import PickingJar from '../components/PickingJar';
import ResultsTray from '../components/ResultsTray';

function PickingJarContainer(){

    const [results, setResults] = useState([]);
    const [containerWidth, setContainerWidth] = useState(null);
    const elementRef = useRef(null);

    

    useEffect(()=>{

        const fixContainerWidth = () => {
            const currentElement = elementRef.current;
            const width = window.getComputedStyle(currentElement).getPropertyValue('width');
            const widthNum = getNumFromStyle(width);
            setContainerWidth(widthNum);
        }

        fixContainerWidth();

        window.addEventListener('resize', fixContainerWidth)

        return () => {
            window.removeEventListener('resize', fixContainerWidth)
        }
    }, []);

    function getNumFromStyle(styleString) {
        const suffix = styleString.slice(-2);
        if( suffix === "px") return styleString.slice(0,-2);
        if( suffix.slice(-1) === '%') return styleString.slice(0, -1);
        return "Error";
    }

    // From https://www.w3schools.com/js/js_random.asp
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const specifications = {};
    specifications['colors'] = ['red', 'blue', 'black', 'coral', 'lightblue', 'green'];
    specifications['counts'] = [3, 7, 1, 2, 12, 3];

    const total = specifications.counts.reduce((sum, a) => sum + a, 0);

    function handlePick({target}){
        let indexChoice = getRndInteger(0, total);
        //alert(`Total: ${total}, Choice: ${indexChoice}`);
        let colorIndex = 0;
        while (indexChoice > 0 && colorIndex < specifications.colors.length) {
            indexChoice -= specifications.counts[colorIndex];
            if (indexChoice > 0) colorIndex++;
        }

        setResults([specifications.colors[colorIndex], ...results]);
    }

    const containerStyle = {
        flex:1,
        flexDirection:'column',
        display:'flex',
        //border:'dashed lightgreen 2px',
        justifyContent:'center',
        flexGrow:1
    }

    return (
        <div style={{flex:1}} ref={elementRef}>
            <PickingJar style={{ alignSelf: 'flex-start' }} specs={specifications} onPick={handlePick} containerWidth={containerWidth}/>
            <div style={containerStyle}>
                <ResultsTray contents={results} containerWidth={containerWidth} />
            </div>
        </div>
        
    );
}

export default PickingJarContainer;