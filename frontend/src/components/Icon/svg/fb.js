import React from "react";

const FB = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.02 34.02">
        <defs>
            <style>{`.fb-svg{fill:${color};}`}</style>
        </defs>
        <title>Facebook</title>
        <path
            className="fb-svg"
            d="M682.41,367.56a17,17,0,1,0,17,17A17,17,0,0,0,682.41,367.56Zm3.76,14.12-.2,2.55h-2.61v8.84h-3.29v-8.84h-1.76v-2.55h1.76V380a4.61,4.61,0,0,1,.56-2.63,3.14,3.14,0,0,1,2.73-1.28,11.35,11.35,0,0,1,3.16.31l-.44,2.61a6.08,6.08,0,0,0-1.42-.21c-.68,0-1.3.24-1.3.93v2Z"
            transform="translate(-665.4 -367.56)"
        />
    </svg>
);

export { FB };
