import React from "react";

const ArrowDown = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 26 15"  style={{ transform: "rotate(180deg)", msTransform: "rotate(180deg)" }}>
        <defs>
            <style>{`.arrow-down-svg {fill: ${color};fill-rule: evenodd;}`}</style>
        </defs>
        <path className="arrow-down-svg" d="M6248.16,2765l2.85-2.69-13-12.31-13,12.31,2.85,2.69,10.15-9.61Z" transform="translate(-6225 -2750)" />
    </svg>
);

export { ArrowDown };
