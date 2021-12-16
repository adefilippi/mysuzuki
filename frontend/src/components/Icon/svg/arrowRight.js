import React from "react";

const ArrowRight = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 18.844 33.969">
        <defs>
            <style>{`.arrow-right-svg {fill: ${color};fill-rule: evenodd;}`}</style>
        </defs>
        <path
            className="arrow-right-svg"
            d="M225,92.1L211.1,106c-0.7,0.7-0.7,1.9,0,2.6c0.7,0.7,1.8,0.7,2.5,0l15.2-15.2c0.7-0.7,0.7-1.8,0-2.5c0,0,0,0,0,0l-15.2-15.2c-0.3-0.3-0.8-0.5-1.3-0.5c-0.5,0-0.9,0.2-1.3,0.5c-0.7,0.7-0.7,1.8,0,2.5c0,0,0,0,0,0L225,92.1z"
            transform="translate(-210.594 -75.125)"
        />
    </svg>
);

export { ArrowRight };
