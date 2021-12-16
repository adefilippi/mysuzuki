import React, { Component } from "react";
import propTypes from "prop-types";
import { DealershipListItem } from "./DealershipListItem";
import "./DealershipList.scss";
import { Loader } from "../../Loader";

class DealershipList extends Component {
    render() {
        return (
            <div className="DealershipList">
                {this.props.loading && (
                    <div className="DealershipList-loader">
                        <Loader />
                    </div>
                )}

                {this.props.dealerships.map((dealership, index) => {
                    return (
                        <DealershipListItem
                            isCurrent={this.props.currentDealership && dealership.get("@id") === this.props.currentDealership.get("@id")}
                            onChoose={this.props.onDealershipChosen}
                            key={dealership.get("externalId")}
                            position={index}
                            dealership={dealership}
                        />
                    );
                })}
            </div>
        );
    }
}

DealershipList.defaultProps = {};

DealershipList.propTypes = {
    currentDealership: propTypes.object,
    loading: propTypes.bool,
    onDealershipChosen: propTypes.func,
    dealerships: propTypes.object.isRequired
};

export { DealershipList };
