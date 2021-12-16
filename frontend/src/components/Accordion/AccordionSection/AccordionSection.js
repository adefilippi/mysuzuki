import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as striptags from "striptags";
import {ICON_COLORS, ICON_NAMES} from "../../index";
import {Icon} from "../../Icon";
import {DeviceContextConsumer} from "../../contexts/Device";

import "./AccordionSection.scss";

class AccordionSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };
    }

    handleHeaderClick = value => {
        this.setState(prevState => ({[value]: !prevState[value]}));
        this.props.handleHeaderClick && this.props.handleHeaderClick();
    };

    componentDidUpdate(prevProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            this.setState({isOpen: this.props.isOpen});
        }
    }

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };

                    return (
                        <section className={classnames({"accordion-section": true, ...responsive})}>
                            <header className="accordion-section-header" onClick={() => this.handleHeaderClick("isOpen")}>
                                { this.props.iconName &&
                                    <Icon name={this.props.iconName} color={ICON_COLORS.SECONDARY} size="35px"/>
                                }
                                { this.props.iconUrl &&
                                    <div className="icon">
                                        <img src={this.props.iconUrl} width="35px" height="35px"/>
                                    </div>
                                }
                                <h2 className={classnames({...responsive})}>{this.props.title}</h2>
                                <Icon name={ICON_NAMES[`${this.state.isOpen ? 'LESS' : 'MORE'}`]} color={ICON_COLORS.CURRENT} size="25px" />
                            </header>
                            { this.state.isOpen && (
                                <article className="accordion-section-article">
                                    {this.props.children}
                                </article>
                            )}
                        </section>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

AccordionSection.defaultProps = {
    isOpen: false,
};

AccordionSection.propTypes = {
    iconName: PropTypes.string,
    isOpen: PropTypes.bool,
    iconUrl: PropTypes.string,
    title: PropTypes.string
};

export { AccordionSection };
