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
                <div className='slider'></div>
                <div className='celcius'>C</div>
                <div className='fahrenheit'>F</div>
            </div>
        </div>
    );
}

