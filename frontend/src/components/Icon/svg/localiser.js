import React from "react";

const Localiser = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 20 20">
        <defs>
            <style>{`.localiser-svg,.localiser-svg-2{fill: none;stroke:${color}}.localiser-svg{stroke-miterlimit:10;}.localiser-svg-2{stroke-linecap:round;stroke-linejoin:round;`}</style>
        </defs>
        <circle className="localiser-svg" cx="10" cy="10" r="9.5" />
        <line className="localiser-svg-2" x1="10" y1="0.5" x2="10" y2="5.07" />
        <line className="localiser-svg-2" x1="10" y1="14.93" x2="10" y2="19.5" />
        <line className="localiser-svg-2" x1="19.5" y1="10" x2="14.93" y2="10" />
        <line className="localiser-svg-2" x1="5.07" y1="10" x2="0.5" y2="10" />
    </svg>
);

export { Localiser };
