import react, { useState, useEffect } from 'react';
import "../CSS/Nav.css";
import TempSelector from './Temp-Selector';

export default function Nav() {
    return (
        <>
            <div className='nav-container'>
                <div className='search-bar'>
                    <input type='text' placeholder='Search for a city' />
                </div>
                <div className='temp-selector'>
                    <TempSelector />
                </div>
            </div>

            <div className='temp-selection'>

            </div>
        </>
    )
}