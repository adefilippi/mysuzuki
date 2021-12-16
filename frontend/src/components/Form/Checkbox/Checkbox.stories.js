import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Checkbox } from "./";

storiesOf("Checkbox", module).add("checkbox", () => (
  <div style={{ backgroundColor: "#EFF3F4", padding: "15px" }}>
    <Checkbox label="Particulier" onValueChanged={action("onValueChanged")} />
  </div>
));
