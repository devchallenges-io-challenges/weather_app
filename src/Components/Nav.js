import react, { useState, useEffect } from 'react';
import "../CSS/Nav.css";

export default function Nav() {
    return (
        <>
            <div className='nav-container'>
                <div className='search-bar'>
                    <input type='text' placeholder='Search for a city' />
                </div>
                <div className='temp-selector'>

                </div>
            </div>

            <div className='temp-selection'>

            </div>
        </>
    )
}