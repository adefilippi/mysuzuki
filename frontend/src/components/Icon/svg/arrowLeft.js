import React from "react";

const ArrowLeft = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 18.844 33.969">
        <defs>
            <style>{`.arrow-left-svg {fill: ${color};fill-rule: evenodd;}`}</style>
        </defs>
        <path
            className="arrow-left-svg"
            d="M214.978,92.108l13.892-13.9a1.811,1.811,0,0,0-2.561-2.561L211.131,90.834a1.8,1.8,0,0,0,0,2.561l15.178,15.169a1.819,1.819,0,0,0,1.273.536,1.765,1.765,0,0,0,1.274-.536,1.8,1.8,0,0,0,0-2.561Z"
            transform="translate(-210.594 -75.125)"
        />
    </svg>
);

export { ArrowLeft };
