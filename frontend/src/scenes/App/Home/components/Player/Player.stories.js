import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../../../../../services/";
import { Player } from "./";
import { DeviceContextProvider } from "../../../../../components";

storiesOf("Application", module)
  .addDecorator((getStory) => <I18nextProvider i18n={i18n}>{getStory()}</I18nextProvider>)
  .addDecorator(function(getStory) {
    return <DeviceContextProvider>{getStory()}</DeviceContextProvider>;
  })
  .add("Player", () => (
    <div style={{ backgroundColor: "#d52b1e" }}>
      <Player />
    </div>
  ));
