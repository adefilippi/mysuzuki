import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import "./OperationCardList.scss";
import { OperationCard } from "../../OperationCard";

const labels = [
    "Entretien 1 an / 15 000 km ou 20 000 Km", //0
    "Entretien 2 ans / 30 000 km ou 40 000 Km", //1
    "Entretien 3 ans / 45 000 km ou 60 000 Km", //2
    "Entretien 4 ans / 60 000 km ou 80 000 Km", //3
    "Entretien 5 ans / 75 000 km ou 100 000 Km", //4
    "Entretien 6 ans / 90 000 km ou 120 000 Km", //5
    "Entretien 7 ans / 105 000 km ou 140 000 Km", //6
    "Entretien 8 ans / 120 000 km ou 160 000 Km", //7
    "Entretien 9 ans / 135 000 km ou 180 000 Km", //8
    "Entretien 10 ans / 150 000 km ou 200 000 Km", //9
    "Entretien 11 ans et plus", //10
    "Visite de courtoisie", //11
    "Vidange simple", //12
    "Vidange intervention FAP (filtre à particules)", //13
    "Réparation autre", //14
    "Autre", //15
    "Campagne de rappel", //16
    "Carrosserie", //17
    "Achat pièce(s) comptoir", //18
    "Pré-contrôle", //19
    "Garantie", //20
];

//Changer l'icone par le bon
const icons = [
    "WARRANTY_1YEAR",//0
    "WARRANTY_2YEARS",//1
    "WARRANTY_3YEARS",//2
    "WARRANTY_4YEARS",//3
    "WARRANTY_5YEARS",//4
    "WARRANTY_6YEARS",//5
    "WARRANTY_7YEARS",//6
    "WARRANTY_8YEARS",//7
    "WARRANTY_9YEARS",//8
    "WARRANTY_10YEARS",//9
    "WARRANTY_11YEARS",//10
    "SHAKE_HANDS",//11
    "OIL",//12
    "PARTICLE_FILTER",//13
    "GEAR",//14
    "TOOLS",//15
    "CAR_WRENCH",//16
    "CAR_DOOR",//17
    "STEERING_WHEEL",//18
    "CAR_MAGNIFYING_GLASS",//19
    "THUMBS_UP",//20
];

class OperationCardList extends Component {

    getListPlaceholderElements = batchSize => {
        return [...Array(batchSize)].map((e, i) => <div key={`placeholder-${i}`} className="operation-card-placeholder" />);
    };

    render() {
        return (
            <section className="operation-card-list">
                <div className="operation-card-list-content" >
                    <div className="operation-card-list-content-group" >
                        { this.props.operations.slice(0, this.props.nbOfOperationToShow).map((operation, index) => (
                            <OperationCard
                                key={index}
                                {...operation}
                                maintenance={operation}
                                openModal={this.props.openModal}
                                openDeleteModal={this.props.openDeleteModal}
                                icon={icons[labels.findIndex((label) => operation.type.toLowerCase() === label.toLowerCase())]}
                            />
                        ))}
                        { this.getListPlaceholderElements(3) }
                    </div>
                </div>
            </section>
        );
    }
}

OperationCardList.defaultProps = {
    operations: [],
    openModal: () => {},
    openDeleteModal: () => {},
};

OperationCardList.propTypes = {
    operations: PropTypes.array,
    openModal: PropTypes.func,
    openDeleteModal: PropTypes.func,
};

const TranslatedOperationCardList = translate("operation", {wait :true})(OperationCardList);
export { TranslatedOperationCardList as OperationCardList };
