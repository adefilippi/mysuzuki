import React from "react";
import { storiesOf } from "@storybook/react";
import {VehicleNextDate} from "./VehicleNextDate";

storiesOf("Vehicles", module).add("Next Date", () => (
<div>
    <VehicleNextDate
      type="Contrôle Technique"
      date="20/11/2018"
      tooltip={true}
      tooltipText="Pourquoi faire son contrôle technique ? Lorem ipsum dolor sit amet."
    />
    <div style={{backgroundColor: "#000"}}>
        <VehicleNextDate
            type="Contrôle Technique"
            date="20/11/2018"
            tooltip={true}
            tooltipText="Pourquoi faire son contrôle technique ? Lorem ipsum dolor sit amet."
            inverseColors={true}
        />
    </div>
</div>
));
