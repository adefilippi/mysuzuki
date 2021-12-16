import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Infos } from "./";

storiesOf("Infos", module)
  .add("Default Infos", () => (
      <div style={{backgroundColor: "#003145", padding: "5rem"}}>
          <Infos title="VIN / NUMERO DE SERIE" text="1234567891234TEST" />
          <Infos title="Date de première immatriculation" text="04/06/1987" />
          <Infos title="Véhicule neuf" inline/>
          <Infos title="immatriculation" text="CB-945-ZT" inline/>
      </div>
  ));
