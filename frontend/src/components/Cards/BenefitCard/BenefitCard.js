import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DeviceContextConsumer } from "../../";
import "./BenefitCard.scss";

export class BenefitCard extends Component {
  render() {
    return (
        <DeviceContextConsumer>
            { ({ isMobile, isMobileSmall, isTablet }) => {

                const benefitCardClasses = classnames({
                  "benefit-card": true,
                  bordered: this.props.border,
                  "special-game": this.props.game,
                  "special-offer": this.props.offer,
                  mobile: isMobile,
                  tablet: isTablet,
                  "mobile-small": isMobileSmall
                });

                const fullImageClasses = classnames({
                  "benefit-card-full-image": true,
                  "background-cover": this.props.cover,
                });

                const figureImageStyle = {
                  backgroundImage: `url(${this.props.imageUrl})`
                };

                const { text } = this.props;

                return (
                    <div className={benefitCardClasses}>
                        <div className={classnames({"benefit-card-header": true, mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet})}>
                            <div className="benefit-card-header-special">{this.props.header.special}</div>
                            <div className="benefit-card-header-start">{this.props.header.start}</div>
                            <div className="benefit-card-header-end">{this.props.header.end}</div>
                        </div>
                        {text ? (
                            <figure className={classnames({"benefit-card-figure": true, "mobile-small": isMobileSmall})}>
                                <div
                                    className="benefit-card-figure-image"
                                    style={ figureImageStyle }
                                    role="img"
                                    title={this.props.alt}
                                    aria-label={this.props.alt}
                                ></div>
                                <figcaption className="benefit-card-figure-text">{text}</figcaption>
                            </figure>
                        ) : (
                            <div className={fullImageClasses} style={{ backgroundImage: `url(${this.props.imageUrl})` }} />
                        )}
                    </div>
                )

            }}
        </DeviceContextConsumer>

    );
  }
}

BenefitCard.defaultProps = {
  header: {},
  imageUrl: "",
  alt: "",
  text: "",
  className: "",
};

BenefitCard.propTypes = {
  header: PropTypes.object,
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};
