import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { DeviceContextConsumer, Text, Select } from "../../../../../components";

class ProForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSeparated: props.isSeparated,
      wrapperClassName: props.wrapperClassName,
    };
  }

  handleChange = (key, value) => {
    this.props.onValueChange({[key]: value});
  };

  render() {
    const {
      errors,
      isProfessional,
      jobOrganizationName,
      jobOrganizationSize,
      jobOrganizationNafCode,
      jobOrganizationSiretCode,
      jobName,
      jobDepartment,
      jobOrganizationNumberOfVehicles,
      CompanyStaffSizes,
    } = this.props;

    const {
      isSeparated,
      wrapperClassName,
    } = this.state;
    return (
      <DeviceContextConsumer>
        {({ isMobile, isMobileSmall, isTablet }) => {

          return (
            <div>
              {isProfessional && (
                <div className={`
                  ${wrapperClassName || ''}
                  ${isMobile ? 'mobile' : ''}
                  ${isMobileSmall ? 'mobile-small' : ''}
                `}>
                  <div className={`${isSeparated ? 'column' : ''}`}>
                    <Text
                      name="jobOrganizationName"
                      initialValue={jobOrganizationName}
                      value=""
                      label={this.props.t("jobOrganizationName")}
                      error={errors.organizationName}
                      errorMessage={errors.organizationName ? this.props.t("organizationNameError") : ""}
                      maxlength={32}
                      large={isSeparated}
                      transparent
                      required
                      onValueChanged={(value) => this.handleChange("jobOrganizationName", value)}
                    />
                    <Select
                      initialOption={jobOrganizationSize}
                      label={this.props.t("jobOrganizationSize")}
                      options={CompanyStaffSizes}
                      dark
                      large={isSeparated}
                      required={false}
                      onOptionChanged={(option) => this.handleChange("jobOrganizationSize", option.value)}
                    />
                    <Text
                      name="jobOrganizationNafCode"
                      initialValue={jobOrganizationNafCode}
                      value=""
                      label={this.props.t("jobOrganizationNafCode")}
                      placeholder={this.props.t("jobOrganizationNafCodePlaceholder")}
                      error={errors.naf}
                      errorMessage={errors.naf ? this.props.t("NafError") : ""}
                      maxlength={5}
                      large={isSeparated}
                      transparent
                      onValueChanged={(value) => this.handleChange("jobOrganizationNafCode", value)}
                    />
                    <Text
                      name="jobOrganizationSiretCode"
                      initialValue={jobOrganizationSiretCode}
                      value=""
                      label={this.props.t("jobOrganizationSiretCode")}
                      placeholder={this.props.t("jobOrganizationSiretCodePlaceholder")}
                      maxlength={16}
                      large={isSeparated}
                      transparent
                      error={errors.siretCode}
                      errorMessage={errors.siretCode ? this.props.t("siretError") : ""}
                      onValueChanged={(value) => this.handleChange("jobOrganizationSiretCode", value)}
                    />
                  </div>
                  <div className={`${isSeparated ? 'column' : ''}`}>
                    <Text
                      name="jobName"
                      initialValue={jobName}
                      value=""
                      label={this.props.t("jobName")}
                      large={isSeparated}
                      maxlength={40}
                      transparent
                      onValueChanged={(value) => this.handleChange("jobName", value)}
                    />
                    <Text
                      name="jobDepartment"
                      initialValue={jobDepartment}
                      value=""
                      label={this.props.t("jobDepartment")}
                      maxlength={40}
                      large={isSeparated}
                      transparent
                      onValueChanged={(value) => this.handleChange("jobDepartment", value)}
                    />
                    <Text
                      name="jobOrganizationNumberOfVehicles"
                      initialValue={jobOrganizationNumberOfVehicles}
                      value=""
                      label={this.props.t("jobOrganizationNumberOfVehicles")}
                      figuresOnly
                      maxlength={32}
                      large={isSeparated}
                      transparent
                      onValueChanged={(value) => this.handleChange("jobOrganizationNumberOfVehicles", value)}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </DeviceContextConsumer>
    );
  }
}

const TranslatedProForm = translate("signupVehicle", { wait: true})(ProForm);
export { TranslatedProForm as ProForm };