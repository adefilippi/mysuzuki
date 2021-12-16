import React from "react";

const Review = ({ color, size, className }) => (
    <svg id="review_svg" width={size} height={size} className={className} viewBox="0 0 81 81">
        <defs>
            <style>{`.cls-review{fill:${color};}`}</style>
        </defs>
        <path
            className="cls-review"
            d="M7407.14,3603.86a40.523,40.523,0,0,0-49.2-6.26l-4.91-4.91a2.376,2.376,0,0,0-4.05,1.68v11.36a2.375,2.375,0,0,0,2.37,2.37h11.36a2.376,2.376,0,0,0,1.68-4.05l-2.97-2.97a35.755,35.755,0,1,1-18.68,31.42,2.37,2.37,0,0,0-4.74,0A40.5,40.5,0,1,0,7407.14,3603.86Zm-13.39,26.27h-12.88v-12.88a2.37,2.37,0,0,0-4.74,0v15.25a2.369,2.369,0,0,0,2.37,2.37h15.25A2.37,2.37,0,0,0,7393.75,3630.13Z"
            transform="translate(-7338 -3592)"
         />
    </svg>
);

export { Review };
