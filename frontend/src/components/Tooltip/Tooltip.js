import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, ICON_NAMES, DeviceContextConsumer } from "../";
import classnames from "classnames";
import "./Tooltip.scss";

export class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isClicked: false
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && this.state.isVisible && !this.wrapperRef.contains(event.target)) {
            this.handleTooltipClick();
        }
    };

    handleTooltipClick = () => {
        if (!this.state.isVisible) {
          this.setState({ isVisible: true, isClicked: !this.state.isClicked });
        }else{
          this.setState({ isVisible: !this.state.isClicked, isClicked: !this.state.isClicked })
        }
    };

    handleMouseLeave = (event) => {
        if (this.state.isVisible && !this.state.isClicked) {
            this.setState({ isVisible: false });
        }
    };

    handleMouseEnter = () => {
        if (!this.state.isVisible) {
            this.setState({ isVisible: true });
        }
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile }) => {
                    const { isVisible } = this.state;
                    const { right, bottom } = this.props;
                    const wrapperClasses = classnames({
                        "tooltip-text-wrapper": true,
                        "mobile": isMobile,
                        right: right,
                        left: !right,
                        bottom: bottom,
                        top: !bottom
                    });
                    const textClasses = classnames({
                        "tooltip-text": true,
                        "mobile": isMobile
                    });

                    return(
                        <div className="tooltip" ref={this.setWrapperRef}>
                            <div
                              onMouseEnter={this.handleMouseEnter}
                              onMouseLeave={this.handleMouseLeave}
                              >
                              <Icon size={this.props.size} name={ICON_NAMES.TOOLTIP} onClick={this.handleTooltipClick} />
                            </div>
                            {isVisible && (
                                <div className={wrapperClasses}>
                                    <div className={textClasses}>
                                        { this.props.title && (
                                            <h3 className="tooltip-title">{this.props.title}</h3>
                                        )}
                                        { this.props.html ? (
                                            <div dangerouslySetInnerHTML={{__html: this.props.text}}/>
                                        ) : (
                                            <p>{this.props.text}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }}
            </DeviceContextConsumer>
        );
    }
}

Tooltip.defaultProps = {
    text: "",
    size: "30px",
    right: false,
    left: false,
    top: false,
    bottom: false,
    html: false,
};

Tooltip.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.string,
    right: PropTypes.bool,
    left: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    html: PropTypes.bool,
};
