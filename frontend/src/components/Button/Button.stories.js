import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./";
import { Icon, ICON_NAMES } from "../../components";

storiesOf("Button", module)
  .add("primary", () => <Button primary onClick={action("clicked")} label="Voir mes offres en cours" />)
  .add("whiteSecondary", () => (
    <div style={{ backgroundColor: "#003145", padding: "50px" }}>
      <Button whiteSecondary onClick={action("clicked")} label="Voir mes offres en cours" />
    </div>
  ))
  .add("tertiary", () => <Button tertiary onClick={action("clicked")} label="Demander un rendez-vous" />)
  .add("whiteTertiary", () => (
    <div style={{ backgroundColor: "#d52b1e", padding: "50px" }}>
      <Button whiteTertiary onClick={action("clicked")} label="Voir mes offres en cours" />
    </div>
  ))
  .add("transparent", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
      <Button transparent onClick={action("clicked")} label="Voir mes offres en cours" />
    </div>
  ))
  .add("simple", () => <Button simple onClick={action("clicked")} label="Mot de passe oublié ?" />)
  .add("white link", () => (
    <div style={{ backgroundColor: "#73B5E0", padding: "50px" }}>
      <Button white link onClick={action("clicked")} label="Voir tous vos avantages" />
    </div>
  ))
  .add("primary link", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
      <Button primary link onClick={action("clicked")} label="Voir tous vos avantages" />
    </div>
  ))
  .add("primary icon", () => (
    <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}>
      <Button primary icon={ICON_NAMES.DELETE} onClick={action("clicked")} label="Voir tous vos avantages" />
    </div>
  ))
  .add("backBtn", () => <Button backBtn onClick={action("clicked")} label="Revenir à la page d'accueil" />);
