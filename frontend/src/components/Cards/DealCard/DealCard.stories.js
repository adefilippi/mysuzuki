import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DealCard } from "./";

import JEU_CONCOURS from "../../../assets/img/homepage_jeuxconcours.png";

storiesOf("Cards", module).add("Deal Card", () => (
  <div style={{backgroundColor: '#eff3f4',padding:'5rem', display: 'flex', }}>
      <DealCard
        dealType="Jeu"
        imageUrl={JEU_CONCOURS}
        imageAlt="image"
        dealText="sur l'achat de votre prochain accessoire"
        dealClosingDate="Jusqu'au 30/07"
        dealDiscount="-20%"
        dealershipOnly="SUZUKI PARIS - PYRENEES"
        dealButtonLabel="Profitez de l'offre"
      />
      <DealCard
        dealType="Jeu"
        imageUrl={JEU_CONCOURS}
        imageAlt="image"
        dealText="sur l'achat de votre prochain accessoire"
        dealClosingDate="Jusqu'au 18/08"
        dealButtonLabel="Jouez"
      />
  </div>
));
