// ThemeToggleBtn.js

import React from 'react';
import { toggleTheme } from './ThemeToggler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const buttonStyle = `
.theme-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 999; /* Ensure it's above other elements */
}

.theme-toggle-btn svg {
    width: 24px;
    height: 24px;
}
`;

function ThemeToggleBtn() {
    return (
        <>
            <style>{buttonStyle}</style>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
                <FontAwesomeIcon icon={faSun} />
                <FontAwesomeIcon icon={faMoon} />
            </button>
        </>
    );
}

export default ThemeToggleBtn;