import React, { Component } from "react";

import "./Tags.scss";
import { Icon, ICON_NAMES } from "../Icon/index";

export class Tags extends Component {
    render() {
        const { tags } = this.props;

        return (
            <div className="tags">
                {tags.map((tag, key) => {
                    return (
                        <button
                            className="btn btn-primary button small button-icon tags__button"
                            key={key}
                            onClick={() => this.props.removeTag(tag)}
                        >
                            <Icon name="delete" color="currentColor" size="18px" />
                            <span>&nbsp;{tag}</span>
                        </button>
                    )
                })}
            </div>
        );
    }
}

