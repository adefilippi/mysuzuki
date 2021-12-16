import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SearchBar } from "./";

storiesOf("SearchBar", module).add("basic", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "20px" }}>
        <SearchBar onSearchChange={action("search has changed")} />
    </div>
));
