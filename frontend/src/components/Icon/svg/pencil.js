import React from "react";

const Pencil = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 70.88 70.83">
        <defs>
            <style>{`.pencil-svg {fill: ${color};fill-rule: evenodd;}`}</style>
        </defs>
        <path
            className="pencil-svg"
            d="M16.1,82.1a.9.9,0,0,0,.5-.1l17-4.2h.1c.1,0,.2-.1.4-.1a.1.1,0,0,0,.1-.1c.1-.1.3-.2.4-.3L79,32.7l4.2-4.2A6,6,0,0,0,85,24.3a5.6,5.6,0,0,0-1.8-4.2L76.1,13a6.1,6.1,0,0,0-8.5,0l-4.2,4.2L18.9,61.7c-.1.1-.2.3-.3.4a.1.1,0,0,1-.1.1.37.37,0,0,0-.1.3v.1l-4.2,17a1.9,1.9,0,0,0,.5,1.9A1.68,1.68,0,0,0,16.1,82.1ZM33,73l-3.5-3.5L71.2,27.8l2.6,2.6.9.9ZM70.5,15.8a1.93,1.93,0,0,1,2.8,0l7.1,7.1h0a1.93,1.93,0,0,1,0,2.8l-2.8,2.8-9-9-.9-.9Zm-5.6,5.6,3.5,3.5L26.7,66.7l-3.5-3.5ZM21.4,67.1l7.7,7.7-5.7,1.4L20,72.7Z"
            transform="translate(-14.12 -11.28)"
        />
    </svg>
);

export { Pencil };
