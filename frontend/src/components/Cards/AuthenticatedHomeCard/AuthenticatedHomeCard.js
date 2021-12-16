import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {translate} from "react-i18next";

import {DeviceContextConsumer} from "../../contexts/Device";
import "./AuthenticatedHomeCard.scss";

class AuthenticatedHomeCard extends Component {
    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isTablet }) => {
                    const responsive = { mobile: isMobile, tablet: isTablet };

                    return (
                        <figure
                            className={classnames({
                                "authenticated-home-card-container": true,
                                clickable: this.props.clickable,
                                ...responsive
                            })}
                            onClick={() => this.props.onCardClick(this.props[this.props.id])}
                        >
                            <img
                                src={this.props.imageUrl}
                                srcSet={[
                                    this.props.imageUrl && `${this.props.imageUrl} 1x`,
                                    this.props.largeImageUrl && `${this.props.largeImageUrl} 2x`,
                                ]}
                                alt={this.props.imageAlt}
                                className={classnames({
                                    "authenticated-home-card-image": true,
                                    "welcome-offer": this.props.isWelcomeOffer || this.props.isAvantageOffer
                                })}
                            />
                            <figcaption className="authenticated-home-card-caption">
                                { (this.props.dealType || this.props.dealershipOnly) && (
                                    <header className={classnames({
                                        "authenticated-home-card-header": true,
                                        "authenticated-home-card-header-dealership-only": this.props.dealershipOnly && !this.props.isWelcomeOffer && !this.props.isAvantageOffer
                                    })}>
                                        { !!this.props.dealershipOnly && !this.props.isWelcomeOffer && ! this.props.isAvantageOffer ? (
                                            <div>
                                                <span>{this.props.t("dealCard.only")}</span>
                                                <span>{this.props.t("dealCard.dealershipOnly")}</span>
                                                <span>{this.props.dealershipOnly}</span>
                                            </div>
                                        ) : (
                                            this.props.t("dealCard.dealType." + this.props.dealType)
                                        )}
                                    </header>
                                )}
                                { this.props.isWelcomeOffer ? (
                                    <h2 className="authenticated-home-card-title welcome-offer">
                                        {this.props.t('welcome-title')}
                                    </h2>
                                ) : (
                                    this.props.isAvantageOffer ? (
                                        <h2 className="authenticated-home-card-title welcome-offer">
                                            {this.props.t("avantage-offer-title")}
                                        </h2>
                                    ) : (
                                        <h2 className="authenticated-home-card-title">
                                            { !!this.props.dealDiscount && (
                                              <span className="deal-card-figure-discount">{this.props.dealDiscount}</span>
                                            )}
                                            {this.props.title}
                                        </h2>
                                    )
                                )}
                                <p className="authenticated-home-card-text">
                                    {this.props.text}
                                </p>
                                { !!this.props.closingDate && (
                                    <p className="authenticated-home-card-date">
                                        <span>{this.props.closingDate}</span>
                                    </p>
                                )}
                            </figcaption>
                        </figure>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

AuthenticatedHomeCard.defaultProps = {
    title: "",
    imageUrl: "",
    alt: "",
    text: "",
    closingDate: "",
    dealType: "",
    dealershipOnly: "",
    dealDiscount: "",
    isWelcomeOffer: false,
    isAvantageOffer: false,
    id: "",
    clickable: false,
    onCardClick: () => {},
    deal: null
};

AuthenticatedHomeCard.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    largeImageUrl: PropTypes.string,
    alt: PropTypes.string,
    text: PropTypes.string,
    closingDate: PropTypes.string,
    id: PropTypes.string,
    clickable: PropTypes.bool,
    onCardClick: PropTypes.func,
    deal: PropTypes.object
};

const TranslatedAuthenticatedHomeCard = translate("authenticatedHome", { wait: true })(AuthenticatedHomeCard);
export { TranslatedAuthenticatedHomeCard as AuthenticatedHomeCard };
