import CARNET_DE_BORD from "../../assets/img/homepage_carnetbord.png";
import ENTRETIEN from "../../assets/img/homepage_entretien.png";
import JEUX_CONCOURS from "../../assets/img/homepage_odysee.jpg";
import OFFRES_CONCESSION from "../../assets/img/homepage_offresconcession.png";
import REMISES from "../../assets/img/homepage_remise.png";
import TABLETTE from "../../assets/img/homepage_tablette.png";

export const Statics = [
  {
    header: { start: "Le carnet de bord", end: "de votre véhicule" },
    imageUrl: CARNET_DE_BORD,
    alt: "image",
    text: "Retrouvez toutes les informations de votre véhicule et l’historique de son entretien, y compris si vous le faites entretenir hors du réseau Suzuki.",
  },
  {
    header: { start: "Des offres exclusives", end: "en atelier et en concession" },
    imageUrl: OFFRES_CONCESSION,
    alt: "image",
    text: "Bons de réductions, bilans offerts, prix remisés… ne manquez aucune offre de Suzuki France et de son réseau !",
    border: true,
  },
  {
    header: { start: "Tentez de gagner une tablette tactile en vous inscrivant !" },
    imageUrl: TABLETTE,
    alt: "image",
    game: true,
  },
  {
    header: { start: "Des invitations aux événements", end: "Suzuki et jeux concours" },
    imageUrl: JEUX_CONCOURS,
    alt: "image",
    text: "Tentez de gagner des places pour de grands évènements et participez à des jeux concours VIP !",
    border: true,
  },
  {
    header: { start: "Des conseils d'entretien", end: "et d'utilisation" },
    imageUrl: ENTRETIEN,
    alt: "image",
    text: "Retrouvez des tutoriels, des actualités et des conseils Suzuki pour profiter au maximum de votre véhicule et en prendre soin.",
  },
  {
    header: {
      special: "Profitez de 20% de remise",
      start: "Sur l'achat de votre prochain accessoire dès 50 € TTC d'achat",
    },
    imageUrl: REMISES,
    alt: "image",
    border: true,
    offer: true,
    cover: true,
  },
];
