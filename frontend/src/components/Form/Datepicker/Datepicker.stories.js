import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Datepicker } from "./";

storiesOf("Datepicker", module).add("Datepicker", () => (
  <div style={{ backgroundColor: "#FFF", padding: "50px", height: "500px" }}>
    <Datepicker transparent required label="Date de naissance" icon="MAIL" onDateChange={action("selected")}/>
  </div>
));
