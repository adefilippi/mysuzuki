import React from "react";

const Closing = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 28.83 28.83">
        <defs>
            <style>{`.closing-svg {fill: none;stroke:${color};stroke-miterlimit:10;}`}</style>
        </defs>
        <line className="closing-svg" x1="0.35" y1="0.35" x2="28.48" y2="28.48" />
        <line className="closing-svg" x1="28.48" y1="0.35" x2="0.35" y2="28.48" />
    </svg>
);

export { Closing };
