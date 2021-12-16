import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PasswordInput } from "./";

storiesOf("Text", module).add("password input", () => (
  <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
    <PasswordInput id="1" name="password" label="Mot de passe" initialValue="1234" required transparent onValueChanged={action("OnValueChanged")} />
  </div>
));
