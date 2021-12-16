import React from "react";

const Preference = ({ color, size, className }) => (
    <svg id="Calque_1" width={size} height={size} className={className} viewBox="0 0 395.95 382.7">
        <defs>
            <style>{`.cls-preference{fill:${color};}`}</style>
        </defs>
        <path
            className="cls-preference" d="M-147.08,18c11-2,21.41-4,31.83-5.89C-81.67,6.07-48.08.1-14.54-6.19-12.47-6.57-10.16-9-9.11-11Q19.65-66.95,48.08-123.07c.75-1.47,1.56-2.92,2.79-5.22,1.22,2.17,2.17,3.79,3,5.45q29.91,57,59.76,114.13a8.12,8.12,0,0,0,6.68,4.9c42.54,7,85.05,14.15,128.52,21.44-1.45,1.71-2.57,3.17-3.83,4.5q-44.17,46.65-88.42,93.22a8.9,8.9,0,0,0-2.64,8.4q8.85,57.76,17.49,115.56c.71,4.72,1.36,9.46,2.13,14.83-2.32-1.06-4-1.76-5.57-2.55Q111,223.36,54,195c-3.41-1.71-5.93-1.46-9.15.19Q-10.23,223.5-65.42,251.56c-1.61.82-3.24,1.6-5.75,2.84.85-6.75,1.54-12.74,2.36-18.71,5.19-37.78,10.35-75.55,15.71-113.3.69-4.87-.42-8.24-3.95-11.82-29-29.46-57.75-59.14-86.58-88.75C-144.66,20.76-145.61,19.64-147.08,18ZM143.08,212.34c-.14-2.06-.15-3.22-.32-4.35-4.67-31.12-9.28-62.24-14.15-93.32-.52-3.3.46-5.2,2.54-7.39q32.76-34.4,65.36-68.92c1.18-1.24,2.32-2.52,3.82-4.15-1.77-.46-2.71-.79-3.69-1C166.11,28.17,135.58,23,105,18.12a8.2,8.2,0,0,1-6.75-4.9C94,4.76,89.47-3.6,85.06-12L51.33-76.2c-1.24,2.22-2.24,3.89-3.12,5.62C34.34-43.29,20.54-15.95,6.5,11.25A9.38,9.38,0,0,1,.78,15.7C-31,21.63-62.75,27.27-94.52,33a25.08,25.08,0,0,0-3.34,1.12c1.64,1.76,2.86,3.11,4.13,4.41Q-61.84,71.32-30,104.16c1.31,1.36,2.64,3.71,2.42,5.4-3.19,24.6-6.66,49.16-10,73.73-1.28,9.36-2.49,18.72-3.83,28.84,2.4-1.14,4-1.88,5.64-2.7q40.7-20.75,81.34-41.58a7.05,7.05,0,0,1,7.33-.1c11.24,5.78,22.63,11.28,34,16.87Z"
            transform="translate(147.08 128.29)"
         />
    </svg>
);

export { Preference };