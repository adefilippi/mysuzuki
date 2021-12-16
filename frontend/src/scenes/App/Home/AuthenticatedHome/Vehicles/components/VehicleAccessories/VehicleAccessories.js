import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import { DeviceContextConsumer, Icon, ICON_NAMES, ICON_COLORS, Link } from '../../../../../../../components';

import './VehicleAccessories.scss';

class VehicleAccessories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbOfOperationToShow: 3,
      selectedMaintenance: null,
    };
  }

  render() {
    return (
      <DeviceContextConsumer>
        {({ isMobile, isMobileSmall, isTabletPortrait, isTablet }) => {
          const responsive = {
            mobile: isMobile,
            'mobile-small': isMobileSmall,
            'tablet-portrait': isTabletPortrait,
            tablet: isTablet,
          };

          return (
            <section className='my-vehicle-accessories'>
              <h1 className={classnames({ 'my-vehicle-accessories-title': true, ...responsive })}>
                <Icon
                  name={ICON_NAMES.ACCESSORIES}
                  color={ICON_COLORS.SECONDARY}
                  size={isMobileSmall ? '40px' : '50px'}
                />
                {this.props.t('accessories.title')}
              </h1>

              <section className='my-vehicle-accessories-section'>
                <article className={classnames({ 'my-vehicle-accessories-section-content': true, ...responsive })}>
                  <div className={classnames({ 'my-vehicle-accessories-section-content-images': true, ...responsive })}>
                    {this.props.accessories.map((accessory, id) => (
                      <div className={'my-vehicle-accessories-section-content-wrapper'} key={id}>
                        <a
                          className={classnames({ 'my-vehicle-accessories-section-content-link': true, ...responsive })}
                          href={this.props.accessoriesLink}
                          target='_blank'
                        >
                          <div className={'my-vehicle-accessories-section-content-image-wrapper'}>
                            <img
                              src={accessory.get('path') && accessory.get('path').get('small')}
                              srcSet={[
                                accessory.get('path') && `${accessory.get('path').get('small')} 1x`,
                                accessory.get('path') && `${accessory.get('path').get('large')} 2x`,
                              ]}
                            />
                          </div>

                          <p className='my-vehicle-accessories-section-content-label'>{accessory.get('label')}</p>
                        </a>
                      </div>
                    ))}
                  </div>

                  <Link
                    attributes={{ href: this.props.accessoriesLink || 'https://accessoires.suzuki.fr/Auto/', target: '_blank' }}
                    label={this.props.t('accessories.seeAllAccessories')}
                    button
                    primary
                    compact
                  />
                </article>
              </section>
            </section>
          );
        }}
      </DeviceContextConsumer>
    );
  }
}

VehicleAccessories.defaultProps = {
  accessories: [],
  accessoriesLink: '',
};

VehicleAccessories.propTypes = {
  accessories: PropTypes.object,
  accessoriesLink: PropTypes.string,
};

const TranslatedVehicleAccessories = translate('vehicle', { wait: true })(VehicleAccessories);
export { TranslatedVehicleAccessories as VehicleAccessories };
