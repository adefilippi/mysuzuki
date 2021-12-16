import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PlaceSearchBar } from "./";

storiesOf("SearchBar", module).add("Place search bar", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "20px" }}>
        <PlaceSearchBar placeholder="Ville" onPlaceChanged={action("place has changed")} />
    </div>
));
