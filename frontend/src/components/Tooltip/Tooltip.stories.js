import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Tooltip } from "./";

storiesOf("Tootip", module)
  .add("tooltip", () => <div style={{ backgroundColor: "#EFF3F4", padding: "150px 150px" }}><Tooltip right text="Je suis une infobulle. Je suis visible lorsque vous cliquez sur moi. Pour me refermer, cliquez à nouveau sur moi."/></div>);
