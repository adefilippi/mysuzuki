import React from "react";

const Search = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 63.96 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>{`.search-svg {fill: ${color};fill-rule: evenodd;}`}</style>
        </defs>
        <path
            className="search-svg"
            d="M5556.29,2781.74l-15.55-15.56a27.2,27.2,0,1,0-2.69,2.7l15.55,15.55a1.9,1.9,0,0,0,1.34.57,1.839,1.839,0,0,0,1.35-.57A1.907,1.907,0,0,0,5556.29,2781.74Zm-59.6-33.45a23.455,23.455,0,1,1,23.45,23.47A23.486,23.486,0,0,1,5496.69,2748.29Z"
            transform="translate(-5492.88 -2721)"
        />
    </svg>
);

export { Search };
