import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "react-i18next";
import { Button } from "../../../components";
import "./DealCard.scss";
import { Card } from "../../../utils";

class DealCard extends Component {
    constructor(props) {
        super(props);

        this.state = Card.getDealCardData(props.deal, props.t);
    }

    render() {
        const { type, title, image, discount, dealership, endDate, isWelcomeOffer, isAvantageOffer, summary } = this.state;

        const dealCardContainerClasses = classnames({
            "deal-card-container": true,
            large: this.props.large
        });

        const dealCardClasses = classnames({
            "deal-card": true,
            large: this.props.large
        });

        const dealCardHeaderClasses = classnames({
            "deal-card-header": true,
            "deal-card-header-dealership-only": !!dealership && !isWelcomeOffer && !isAvantageOffer,
        });

        const dealCardFigCaptionClasses = classnames({
            "deal-card-figcaption": true,
            "with-discount": !!discount
        });

        return (
            <div className={dealCardContainerClasses}>
                <section className={dealCardClasses} onClick={this.props.openModal}>
                    <header className={dealCardHeaderClasses}>
                        { !!dealership && !isWelcomeOffer && !isAvantageOffer ? (
                            <div>
                                <span>{this.props.t("dealCard.only")}</span>
                                <span>{this.props.t("dealCard.dealershipOnly")}</span>
                                <span>{dealership}</span>
                            </div>
                        ) : (
                            this.props.t("dealCard.dealType." + type)
                        )}
                    </header>
                    <figure className="deal-card-figure">
                        <div className="deal-card-figure-image-container">
                            { image && (
                                <img
                                    src={image.small}
                                    srcSet={[
                                        image.small && `${image.small} 1x`,
                                        image.large && `${image.large} 2x`,
                                    ]}
                                    alt={ this.props.imageAlt || this.props.t("dealCard.imageAlt") }
                                    className="deal-card-figure-image"
                                />
                            )}
                        </div>
                        <figcaption className={dealCardFigCaptionClasses}>
                            { isWelcomeOffer ? (
                                <h2 className="deal-card-figure-text welcome-offer">
                                    {this.props.t('welcome-title')}
                                </h2>
                            ) : (
                                isAvantageOffer ? (
                                  <h2 className="deal-card-figure-text welcome-offer">
                                      {this.props.t('avantage-offer-title')}
                                  </h2>
                                ) : (
                                    <h2 className="deal-card-figure-text">
                                        { discount && (
                                          <span className="deal-card-figure-discount">{discount}</span>
                                        )}
                                        {title}
                                    </h2>
                                )
                            )}
                            <p className="deal-card-figure-description">
                                {summary}
                            </p>
                            <p className="deal-card-figure-date">{endDate}</p>
                        </figcaption>
                    </figure>
                </section>
                <Button primary center large={this.props.large} label={this.props.buttonLabel} onClick={this.props.openModal}/>
            </div>
        );
    }
}

DealCard.defaultProps = {
  deal: null,
  imageAlt: "",
  buttonLabel: "",
  large: false,
};

DealCard.propTypes = {
    openModal: PropTypes.func,
    deal: PropTypes.object.isRequired,
    imageAlt: PropTypes.string,
    buttonLabel: PropTypes.string,
    largeImageUrl: PropTypes.string,
    large: PropTypes.bool
};

const TranslatedDealCard = translate("deals", { wait: true })(DealCard);
export { TranslatedDealCard as DealCard };
