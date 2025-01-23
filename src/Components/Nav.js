import react, { useState, useEffect } from 'react';
import "../CSS/Nav.css";
import TempSelector from './Temp-Selector';

export default function Nav() {
    return (
        <>
            <div className='nav-container'>
                <div className='search-bar'>
                    <div className='search-icon'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="7" stroke="#97A3B6" stroke-width="2" />
                            <path d="M20 20L17 17" stroke="#97A3B6" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </div>
                    <input type='text' placeholder='Search city...' />
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