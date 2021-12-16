import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Radio } from "./";

storiesOf("Radio", module).add("radio", () => (
  <div style={{ backgroundColor: "#EFF3F4", padding: "15px" }}>
    <Radio
      onOptionChange={action("onOptionChange")}
      choices={[
        {
          label: "Choix 1",
        },
        {
          label: "Choix 2",
        },
        {
          label: "Choix 3",
        },
      ]}
      on
    />
  </div>
));
