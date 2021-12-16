import React from "react";

const getContextValue = ({ isMobileSmall, isMobile, isTabletPortrait, isTabletLandscape, isTablet }) => {
  return ({ isMobileSmall, isMobile, isTabletPortrait, isTabletLandscape, isTablet })
};

const Context = React.createContext(
    getContextValue({
        isMobileSmall: false,
        isMobile: false,
        isTabletPortrait: false,
        isTabletLandscape: false,
        isTablet: false
    })
);

export { Context, getContextValue };
