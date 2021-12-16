import React from "react";

export const Add = ({ color, size, className }) => (
    <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64.07 64.07" >
        <defs>
            <style>{`.add-svg,.add-svg-2{fill:none;stroke:${color};}.add-svg{stroke-width:1.87px;}.add-svg-2{stroke-linecap:round;stroke-width:3px;}`}</style>
        </defs>
        <title>fleche-lien</title>
        <circle id="Ellipse_1_copie" data-name="Ellipse 1 copie" className="add-svg" cx="32.03" cy="32.03" r="31" />
        <line className="add-svg-2" x1="21.03" y1="32.03" x2="44.03" y2="32.03" />
        <line className="add-svg-2" x1="33.03" y1="21.03" x2="33.03" y2="43.03" />
    </svg>
);
