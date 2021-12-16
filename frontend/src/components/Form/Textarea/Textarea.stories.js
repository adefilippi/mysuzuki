import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Textarea } from "./";

storiesOf("Textarea", module)
  .add("textarea input", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
      <Textarea transparent required initialValue="Bonjour, je souhaiterai recevoir des informations svp. MErci." label="Votre message" cols="50" rows="5"/>
    </div>));
