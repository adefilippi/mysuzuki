import React from "react";

const Oil = ({ color, size, className }) => (
    <svg id="oil_svg" width={size} height={size} className={className} viewBox="0 0 65.45 26.13">
        <defs>
            <style>{`.cls-oil{fill:${color};}`}</style>
        </defs>

        <path
            className="cls-oil"
            d="M709.48,384.43c-.61.78-3.66,4.81-3.66,7.29a5.05,5.05,0,0,0,4.79,5.27,4.59,4.59,0,0,0,3.45-1.61,5.57,5.57,0,0,0,1.34-3.66c0-2.48-3-6.51-3.66-7.29A1.48,1.48,0,0,0,709.48,384.43Zm2.42,9.05a1.72,1.72,0,0,1-1.29.63,2.19,2.19,0,0,1-1.92-2.38c0-.74.87-2.39,1.92-4,1,1.57,1.92,3.21,1.92,4A2.66,2.66,0,0,1,711.9,393.48Z"
            transform="translate(-649.95 -371.61)"
        />
        <path
            className="cls-oil"
            d="M664.12,385.15V396.3a1.43,1.43,0,0,0,1.43,1.44H691a1.43,1.43,0,0,0,1-.42l15.69-15.69,2.56.59a2,2,0,0,0,.34,0,1.44,1.44,0,0,0,1-2.49l-2.84-3.33a1.44,1.44,0,0,0-1.81-.32l-16.61,9.56L687,380.42a1.45,1.45,0,0,0-1.21-.66h-9v-2.5h4.52a1.44,1.44,0,0,0,0-2.87H669.39a1.44,1.44,0,0,0,0,2.87h4.52v2.5H668l-12.54-7.93a1.44,1.44,0,0,0-2.07.62l-3.33,7.25a1.4,1.4,0,0,0,0,1.2,1.47,1.47,0,0,0,.91.78l12.25,3.5A1.39,1.39,0,0,0,664.12,385.15ZM667,382.5a1.43,1.43,0,0,0,.61.14H685l3.67,5.74a1.45,1.45,0,0,0,1.93.47l13.8-8-14,14H667Zm-11.65-7.36,9.49,6-.13.08-1.35,1-10-2.84Z"
            transform="translate(-649.95 -371.61)"
        />
    </svg>
);

export { Oil };
