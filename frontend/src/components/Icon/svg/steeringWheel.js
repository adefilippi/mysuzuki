import React from "react";

const SteeringWheel = ({ color, size, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 51.61 51.61">
        <defs>
            <style>{`.cls-steering-wheel{fill:${color};}`}</style>
        </defs>

        <path
            className="cls-steering-wheel"
            d="M663.54,380.16h37.84a.75.75,0,0,0,.69-.34.85.85,0,0,0,.17-.77,20.46,20.46,0,0,0-39.56,0,1.1,1.1,0,0,0,.17.77A.76.76,0,0,0,663.54,380.16Zm18.92-14.62a18.75,18.75,0,0,1,17.72,12.91H664.66A18.94,18.94,0,0,1,682.46,365.54Zm19.78,18.24a5.15,5.15,0,0,0-1.11-.09c-3.7,0-6,1.9-6,5a6.06,6.06,0,0,0,4.65,5.85h.17a.55.55,0,0,0,.61-.34c1.54-3,2.4-5.17,2.4-8.6v-1a.8.8,0,0,0-.69-.77Zm-.77,1.63a14.45,14.45,0,0,1-1.89,7.14,4.12,4.12,0,0,1-2.67-3.95c0-2.93,3-3.27,4.3-3.27a.62.62,0,0,0,.26-.09v.17Zm-18.92,9.64c-5.42,0-10.24,1.89-12.3,4.9a.91.91,0,0,0,.17,1.21,20.21,20.21,0,0,0,12,3.95,20.87,20.87,0,0,0,12.13-3.95.94.94,0,0,0,.17-1.21c-2.06-3-6.88-4.9-12.21-4.9Zm-.09,8.34a18.39,18.39,0,0,1-10.32-3.1c2.06-2.15,6-3.52,10.32-3.52s8.35,1.37,10.32,3.52a18.39,18.39,0,0,1-10.32,3.1Zm0-44.73a25.81,25.81,0,1,0,25.81,25.81,25.8,25.8,0,0,0-25.81-25.81Zm0,49.89a24.09,24.09,0,1,1,24.09-24.08h0a24.16,24.16,0,0,1-24.09,24.08Zm-18.84-26a4.58,4.58,0,0,0-1.11.08.82.82,0,0,0-.69.77v1a21,21,0,0,0,2.4,9.63.91.91,0,0,0,.78.43c.09,0,.17,0,0-.08a6,6,0,0,0-1.38-11.87Zm1.81,10.06a18.11,18.11,0,0,1-1.89-8.17v-.18a4.39,4.39,0,0,1,4.55,4.23.86.86,0,0,1,0,.16,4.3,4.3,0,0,1-2.67,4Zm8.43-5.59c0,2.49,3.7,4.3,8.6,4.3s8.61-1.81,8.61-4.3-3.71-4.31-8.61-4.31-8.6,1.81-8.6,4.31Zm15.48,0c0,1-2.66,2.58-6.88,2.58s-6.88-1.55-6.88-2.58,2.67-2.58,6.88-2.58,6.88,1.54,6.88,2.58Z"
            transform="translate(-656.66 -358.66)"
        />
    </svg>
);

export { SteeringWheel };