import react, { useState, useEffect } from 'react';
import "../CSS/Temp-Selector.css";

export default function TempSelector({ tempChoice, setTempChoice }) {
    const handleToggle = () => {
        setTempChoice(prevChoice => (prevChoice === "F" ? "C" : "F"));
    };

    return (
        <div className='temp-selector'>
            <div className='temp-selector-container'>
                {/* Slider moves based on tempChoice */}
                <div
                    className={`slider ${tempChoice === "F" ? 'fahrenheit' : 'celsius'}`}
                    onClick={handleToggle}
                ></div>

                {/* °C Button */}
                <div
                    className={`celsius ${tempChoice === "C" ? 'active' : ''}`}
                    onClick={() => setTempChoice("C")}
                >
                    °C
                </div>

                {/* °F Button */}
                <div
                    className={`fahrenheit ${tempChoice === "F" ? 'active' : ''}`}
                    onClick={() => setTempChoice("F")}
                >
                    °F
                </div>
            </div>
        </div>
    );
}

