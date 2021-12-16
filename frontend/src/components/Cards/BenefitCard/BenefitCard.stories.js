import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BenefitCard } from "./";

import OFFRES_CONCESSION from "../../../assets/img/homepage_offresconcession.png";

storiesOf("Cards", module).add("Benefit Card", () => (
  <BenefitCard
    header={{ start: "Des offres exclusives", end: "en atelier et en concession" }}
    imageUrl={OFFRES_CONCESSION}
    alt="image"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec."
    border
  />
));
