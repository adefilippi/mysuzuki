import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Select } from "./Select";

storiesOf("Select", module).add("select", () => (
  <div style={{ backgroundColor: "#003145", padding: "15px" }}>
    <Select
      initialOption={{ value: "one", label: "One" }}
      label="Choisissez un modèle"
      required
      options={[
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
        { value: "three", label: "Three" },
        { value: "four", label: "Four" },
        { value: "five", label: "Five" },
        { value: "six", label: "Six" },
      ]}
      onOptionChanged={action("selected")}
    />
  </div>
));
