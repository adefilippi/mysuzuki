import React from "react";
import { ICON_COLORS } from "../";

const Skew = ({ color, size, className }) => (
    <svg id="Calque_1" className="skew-svg" viewBox="0 0 30 100" fill={color} >
        <polygon points="0 0, 30 100, 30 0"/>
    </svg>
);

export { Skew };
