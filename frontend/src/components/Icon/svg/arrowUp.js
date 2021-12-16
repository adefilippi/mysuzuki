import React from "react";

const ArrowUp = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 26 15">
        <defs>
            <style>{`.arrow-up-svg {fill: ${color};fill-rule: evenodd;}`}</style>
        </defs>
        <path className="arrow-up-svg" d="M6248.16,2765l2.85-2.69-13-12.31-13,12.31,2.85,2.69,10.15-9.61Z" transform="translate(-6225 -2750)" />
    </svg>
);

export { ArrowUp };
