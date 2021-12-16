import React from "react";

const Look = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 14">
        <defs>
            <style>{`.look-svg{fill:${color};}`}</style>
        </defs>
        <title>Look</title>
        <path
            className="look-svg"
            d="M22.32,6.59a21.86,21.86,0,0,0-2.46-2.31C17.3,2.22,14.63,1,12,1S6.7,2.22,4.14,4.28A21.86,21.86,0,0,0,1.68,6.59c-.14.14-.26.28-.38.41.12.13.24.27.38.41A21.86,21.86,0,0,0,4.14,9.72C6.7,11.78,9.37,13,12,13s5.3-1.22,7.86-3.28a21.86,21.86,0,0,0,2.46-2.31c.14-.14.26-.28.38-.41C22.58,6.87,22.46,6.73,22.32,6.59ZM12,14C5.37,14,0,7,0,7S5.37,0,12,0,24,7,24,7,18.63,14,12,14Zm0-2.5A4.5,4.5,0,1,0,7.5,7,4.49,4.49,0,0,0,12,11.5Zm0-1A3.5,3.5,0,1,1,15.5,7,3.5,3.5,0,0,1,12,10.5Z"
            transform="translate(0 0)"
        />
    </svg>
);

export { Look };
