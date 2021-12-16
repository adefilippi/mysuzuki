import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { OperationCard } from "./";

const OperationList = [
        {
           "@id": "/api/maintenances/1",
           "@type": "Maintenance",
           "date": "2018-01-10T11:13:41+01:00",
           "type": "Vidange",
           "place": "Couturier S.A.",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": true
       },
       {
           "@id": "/api/maintenances/3",
           "@type": "Maintenance",
           "date": "2013-07-01T12:08:39+02:00",
           "type": "Changement de plaquettes",
           "place": "Germain",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": true
       },
       {
           "@id": "/api/maintenances/4",
           "@type": "Maintenance",
           "date": "2011-04-27T16:20:48+02:00",
           "type": "Changement de plaquettes",
           "place": "Meyer",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": true
       },
       {
           "@id": "/api/maintenances/5",
           "@type": "Maintenance",
           "date": "2010-06-05T11:39:28+02:00",
           "type": "Changement de plaquettes",
           "place": "Peron",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": true
       },
       {
           "@id": "/api/maintenances/2",
           "@type": "Maintenance",
           "date": "2009-12-30T07:59:13+01:00",
           "type": "Contrôle technique",
           "place": "Menard",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": true
       },
       {
           "@id": "/api/maintenances/6",
           "@type": "Maintenance",
           "date": "2017-11-01T00:00:00+01:00",
           "type": "Garantie",
           "place": "SAS LAURIE  (RHONALP’AUTO)",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": false
       },
       {
           "@id": "/api/maintenances/7",
           "@type": "Maintenance",
           "date": "2018-02-25T00:00:00+01:00",
           "type": "Vidange",
           "place": "BOLATRE AUTOMOBILES",
           "vehicle": "/api/vehicles/19UUB2F73FA074352",
           "local": false
       }
]

storiesOf("Cards", module).add("Operation Card", () => (
  <div style={{backgroundColor: '#eff3f4',padding:'5rem', display: 'flex', flexWrap: 'wrap'}}>
      <OperationCard
        date={OperationList[0].date}
        type="Achat neuf"
        place="SOMAT TOURS"
        icon="WHEEL"
      />
      <OperationCard
        date={OperationList[1].date}
        type="Révision complète des 60 000 km"
        place="SOMAT TOURS"
        icon="SHAKE_HANDS"
      />
      <OperationCard
        date={OperationList[2].date}
        type="Carrosserie"
        place="SOMAT TOURS"
        editable
      />
  </div>
));
