import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { VehicleRecap } from "./";

storiesOf("Vehicles", module).add("Recap", () => <VehicleRecap />);
