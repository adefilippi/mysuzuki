import React from "react";

export const ArrowLink = ({ color, size, className }) => (
    <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64.07 64.07">
        <defs>
            <style>{`.arrow-link-svg,.arrow-link-svg-2{fill:none;stroke:${color};}.arrow-link-svg{stroke-width:2.07px;}.arrow-link-svg-2{stroke-linecap:round;stroke-width:3px;}`}</style>
        </defs>
        <title>fleche-lien</title>
        <circle id="Ellipse_1_copie" data-name="Ellipse 1 copie" className="arrow-link-svg" cx="32.03" cy="32.03" r="31" />
        <line className="arrow-link-svg-2" x1="22.13" y1="32.03" x2="39.83" y2="32.03" />
        <line className="arrow-link-svg-2" x1="33.42" y1="23.28" x2="41.94" y2="31.79" />
        <line className="arrow-link-svg-2" x1="33.42" y1="40.79" x2="41.94" y2="32.28" />
    </svg>
);
