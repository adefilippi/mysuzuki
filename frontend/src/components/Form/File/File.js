import React, { Component } from "react";
import { Button } from "../../";
import classnames from "classnames";
import {Icon, ICON_NAMES, ICON_COLORS} from "../../Icon";

import "./File.scss";

export class File extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            name: null,
            errors: {},
            errorMessage: {},
        };
        this.fileElement = React.createRef();
    }

    getFilename = (files) => {
        const names = [];
        Array.from(files).forEach((file) =>  names.push(file.name));
        return names.join(", ");
    };

    onFileChanged = (e) => {
        const name = this.getFilename(e.target.files);

        if (this.props.multiple) {
            this.setState({ value: e.target.files, name: name});
            this.props.onValueChanged(e.target.files);
            return;
        }

        this.setState({ value: e.target.files[0], name: name });
        this.props.onValueChanged(e.target.files[0]);
    };

    delete = () => {
        this.fileElement.current.value = null;
        this.setState({ value: null, name: null });
        this.props.onValueChanged(null);
    };

    render() {

        const { id, label, buttonLabel, multiple, name, error } = this.props;

        const labelClasses = classnames({
            "textarea-label": true,
            // "is-required": required,
            // "is-strong-required": strongRequired,
            // "with-icon": icon,
            // transparent: transparent,
            // large: largeLabel,
            error: error
        });

        return (
            <div>
                <label className={labelClasses}>{label} (10Mo max.)</label>
                { !this.state.value ? (
                    <Button primary link onClick={() => {this.fileElement.current.click()}} label={buttonLabel} />
                ) : (
                   <div className="file-updloaded-file">
                       <span>{this.state.name}</span>
                       <Icon name={ICON_NAMES.DELETE} onClick={this.delete} color={ICON_COLORS.CURRENT} size="20px"/>
                   </div>
                )}
                <input
                    multiple={multiple}
                    className={classnames({hide:true})}
                    type="file"
                    id={id}
                    name={name}
                    onChange={this.onFileChanged}
                    ref={this.fileElement}
                />
            </div>
        );
    }
}

File.defaultProps = {
    id: "file",
    name: "file",
    multiple: false,
    onValueChanged: () => {},
};

File.propTypes = {
};
