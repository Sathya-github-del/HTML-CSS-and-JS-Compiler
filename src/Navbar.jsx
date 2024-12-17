import React from 'react';

const Navbar = ({ language, setLanguage }) => {
    return (
        <div className="navbar">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-selector"
            >
                <option value="html">HTML</option>
                <option value="javascript">JavaScript</option>
            </select>
        </div>
    );
};

export default Navbar;

