import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ICON_NAMES } from "../../";
import { Text } from "./";

storiesOf("Text", module)
  .add("text input", () => (
    <div style={{ backgroundColor: "#003145", padding: "50px" }}>
      <Text id="1" name="email" initialValue="arthur.martinez@gmail.com" label="Email" required onValueChanged={action("OnValueChanged")} />
      <Text id="2" name="mdp" initialValue="mdpnonvisible" label="Mot de passe" password required onValueChanged={action("OnValueChanged")} />
    </div>
  ))
  .add("text input with icon", () => (
    <div style={{ backgroundColor: "#003145", padding: "50px" }}>
      <Text id="1" name="email" initialValue="arthur.martinez@gmail.com" label="Email" required icon={ICON_NAMES.MAIL} onValueChanged={action("OnValueChanged")} />
      <Text id="2" name="mdp" initialValue="mdpnonvisible" label="Mot de passe" password required icon={ICON_NAMES.FB} onValueChanged={action("OnValueChanged")} />
    </div>
  ))
  .add("transparent text input", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
      <Text id="3" name="kilo" value="" label="En moyenne, combien de kilomètres faites-vous par an ?" icon={ICON_NAMES.PHONE} required transparent onValueChanged={action("OnValueChanged")} />
    </div>
  ))
  .add("tooltip text input", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
      <Text id="4" name="kilo" value="" inputTooltip="Je suis une tooltip. Je suis là pour vous aider. N'hésitez pas à me solliciter pour remplir ce formulaire." label="En moyenne, combien de kilomètres faites-vous par an ?" icon={ICON_NAMES.PHONE} required transparent onValueChanged={action("OnValueChanged")} />
    </div>
  ));
