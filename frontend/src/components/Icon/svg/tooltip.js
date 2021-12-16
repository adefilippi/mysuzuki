import React from "react";

export const Tooltip = ({ size, className }) => (
    <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 62 62">
        <defs>
            <style>{`.tooltip-svg{fill:#fff;stroke:#003145;stroke-width:2px;}.tooltip-svg-2{font-size:35px;fill:#003145;text-anchor: end;font-family: Graphik-Regular;}`}</style>
        </defs>
        <title>tooltip</title>
        <circle id="Ellipse_1_copie_4" data-name="Ellipse 1 copie 4" className="tooltip-svg" cx="31" cy="31" r="30" />
        <text id="_copie" data-name="copie" className="tooltip-svg-2" transform="translate(39.822 44.167)">
            ?
        </text>
    </svg>
);
