import React from "react";

const YT = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 34.02 34.02">
        <defs>
            <style>{`.yt-svg{fill:${color};}`}</style>
        </defs>
        <title>youtube</title>
        <polygon className="yt-svg" points="14.74 20.29 20.31 17.02 14.74 13.74 14.74 20.29" />
        <path
            className="yt-svg"
            d="M682.77,367.56a17,17,0,1,0,17,17A17,17,0,0,0,682.77,367.56Zm8.5,20a2.87,2.87,0,0,1-2.93,2.93H677.2a2.87,2.87,0,0,1-2.93-2.93v-6.08a2.87,2.87,0,0,1,2.93-2.93h11.14a2.87,2.87,0,0,1,2.93,2.93Z"
            transform="translate(-665.76 -367.56)"
        />
    </svg>
);

export { YT };
