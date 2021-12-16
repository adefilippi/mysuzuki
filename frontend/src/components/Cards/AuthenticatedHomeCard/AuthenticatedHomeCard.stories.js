import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AuthenticatedHomeCard } from "./";

storiesOf("Cards", module).add("Authenticated Home Card", () => (
  <AuthenticatedHomeCard
    title="Bilan été gratuit"
    imageUrl="https://picsum.photos/260/200/?random"
    alt="image"
    text="Profitez du bilan été gratuit dans le concession LILLE AUTOPLUS jusqu'au 12/12/2018."
  />
));
