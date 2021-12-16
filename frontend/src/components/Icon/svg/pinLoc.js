import React from "react";

const PinLoc = ({ id, color, size, light, className }) => {
    const height = `${(size.split("px")[0] * 4) / 3}px`;

    return (
        <svg id="Calque_1" width={size} height={height} className={className} viewBox="-3 -2 97 130">
            <defs>
                <style>{`.pin-loc-${id} {fill: none;stroke:${color};stroke-width: ${ light ? '4px' : '9px'};fill-rule: evenodd;}`}</style>
            </defs>
            <path
                id="Forme_1206_copie"
                data-name="Forme 1206 copie"
                className={`pin-loc-${id}`}
                d="M10705,5350s-41.9-41.65-42-72,19.1-47,42-47,42,17.35,42,46S10720.7,5334.33,10705,5350Z"
                transform="translate(-10661.5 -5229.5)"
            />

        </svg>
    );
};

export { PinLoc };
