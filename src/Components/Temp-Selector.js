import react, { useState, useEffect } from 'react';
import "../CSS/Temp-Selector.css";

export default function TempSelector() {
    const [isFahrenheit, setIsFahrenheit] = useState(true);

    const handleToggle = () => {
        setIsFahrenheit(prevState => !prevState);
    };

    return (
        <div className='temp-selector'>
            <div className='temp-selector-container'>
                <div
                    className={`slider ${isFahrenheit ? 'fahrenheit' : 'celsius'}`}
                    onClick={handleToggle}
                ></div>
                <div
                    className={`celsius ${!isFahrenheit ? 'active' : ''}`}
                    onClick={() => setIsFahrenheit(false)}
                >
                    °C
                </div>
                <div
                    className={`fahrenheit ${isFahrenheit ? 'active' : ''}`}
                    onClick={() => setIsFahrenheit(true)}
                >
                    °F
                </div>
            </div>
        </div>
    );
}

