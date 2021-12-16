import React from "react";

const More = ({ color, size, className }) => (
    <svg id="moreIcon" width={size} height={size} className={className} viewBox="0 0 28.83 28.83" >
        <defs>
            <style>{`.more-svg {fill: none;stroke:${color};stroke-miterlimit:10;}`}</style>
        </defs>
        <line className="more-svg" x1="14.24" y1="0.35" x2="14.24" y2="28.48" />
        <line className="more-svg" x1="0.35" y1="14.24" x2="28.48" y2="14.24" />
    </svg>
);

export { More};
