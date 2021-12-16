import React, { Component } from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {
  DeviceContextConsumer,
  Button,
  Icon,
  ICON_NAMES,
  ICON_COLORS,
  Loader,
  VehicleNextDate,
  DealDetailsModal,
  DealerShipMeetingRequestLink,
  Banners,
  Select,
} from '../../../../../components';
import { DealershipInformation } from '../Dealership/components/DealershipInformation';
import {
  UserDealershipUtils,
  UserVehiclesUtils,
  UserInformationsActioner,
  FeaturedContentsActioner,
  FeaturedContentUtils,
  BannersActioner,
  BannersUtils,
  UserInformationsUtils,
} from '../../../../../services';
import { PATHS } from '../../../../../routes';
import { VehicleForm } from './component/VehicleForm/VehicleForm';
import { FeaturedContentCardList } from '../../../../../components/Cards/Lists/FeaturedContentCardList';

import './Scene.scss';
import {trackDealModalView} from "../../../../../services/Analytics/track";
import {GameDetailsModal} from "../Deals/components";
import {Actioner as UserGamesActioner} from "../../../../../services/User/Games/actioner";

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: props.vehicle,
            isOpen: false,
            selectedVehicle: undefined,
            fallbackAccessoriesUrl: 'https://accessoires.suzuki.fr/Auto/',
        };
    }

    participate = (id) => {
        this.props.participateGame(id)
            .then((data) => {
                this.setState({
                    errorGame: [],
                    isValid: true,
                });
            })
            .then(() => {
                this.hasAlreadyParticipated();
            })
            .catch(err => {
                this.setState({
                    errorGame: err.violations,
                    isValid: false,
                });
            });
    };

    hasAlreadyParticipated = () => {
        this.props.userParticipatedToGame().then((response) => {
            this.setState({
                participations: response.participations,
            });
        })
    };

    componentDidMount() {
        this.hasAlreadyParticipated();
    }

    componentWillMount() {
        this.props.refreshUser();
    }

    goToDeals = () => {
        this.props.history.push(PATHS.DEALS.ROOT);
    };

    goToArticles = () => {
        this.props.history.push(PATHS.ARTICLES.ROOT);
    };

    goToNews = () => {
        this.props.history.push(PATHS.NEWS.ROOT);
    };

    goToArticle = (type, slug) =>
        type === 'news'
            ? this.props.history.push(PATHS.ARTICLE.buildNewsPath(slug))
            : this.props.history.push(PATHS.ARTICLE.buildPath(slug));

    goToDealership = () => {
        this.props.history.push(PATHS.DEALERSHIPS.ROOT);
    };

    goToVehicles = () => {
        this.props.history.push(
            PATHS.VEHICLES.VEHICLE.buildPathFromVehicleId(this.state.vehicle.get('vin')) + '#maintenance-section'
        );
    };

    goToMyVehicles = () => {
        this.props.history.push(PATHS.VEHICLES.ROOT);
    };

    componentDidMount() {
        this.props.resetFeaturedContents();
        this.getFeaturedContents();
        this.props.resetBanners();
        this.getBanners();

        this.setVehicles();
    }

    getFeaturedContents = () => {
        this.setState({featuredContentsLoading: true});
        this.props.getFeaturedContents().then(() => {
            this.setState({
                featuredContentsLoading: false,
            });
        });
    };

    getBanners = () => {
        this.setState({bannersLoading: true});
        this.props.getBanners().then(() => {
            this.setState({
                bannersLoading: false,
            });
        });
    };

    setVehicles = () => {
        const vehicle = this.props.vehicles.toJS().map((vehicle) => {
            return {
                value: vehicle['@id'],
                label: vehicle['model'],
                ...vehicle,
            };
        });

        this.setState({
            selectedVehicle: vehicle[0],
        });
    };

    render() {
        return (
            <DeviceContextConsumer>
                {({isMobile, isMobileSmall, isTabletPortrait, isTabletLandscape, isTablet}) => {
                    const responsive = {
                        mobile: isMobile,
                        'mobile-small': isMobileSmall,
                        tablet: isTablet,
                        'tablet-portrait': isTabletPortrait,
                        'tablet-landscape': isTabletLandscape,
                    };

                    const {vehicle, selectedVehicle} = this.state;
                    const vehicles = this.props.vehicles.toJS();
                    const vehicleSelectOptions = vehicles.map((vehicle) => {
                        return {
                            value: vehicle['@id'],
                            label: vehicle['model'],
                            ...vehicle,
                        };
                    });

                    return (
                        <div className='authenticated-home'>
                            {this.props.banners.length !== 0 &&
                            (
                                <div className='authenticated-home-header'>
                                    <Banners banners={this.props.banners}/>
                                    {selectedVehicle && selectedVehicle.nextImportantDateType && selectedVehicle.nextImportantDate && (
                                        <div
                                            className={classnames({
                                                'authenticated-home-header-nextdate': true,
                                                ...responsive,
                                            })}
                                        >
                                            <div className='authenticated-home-header-nextdate-header'>
                                                <Icon size='3.5rem' color={ICON_COLORS.SECONDARY}
                                                      name={ICON_NAMES.CALENDAR}/>

                                                <Select
                                                    large
                                                    initialOption={selectedVehicle || vehicleSelectOptions[0]}
                                                    options={vehicleSelectOptions}
                                                    onOptionChanged={vehicle => this.setState({selectedVehicle: vehicle})}
                                                />
                                            </div>

                                            <div className='authenticated-home-header-nextdate-action'>
                                                <VehicleNextDate
                                                    type={selectedVehicle.nextImportantDateType}
                                                    date={new Date(selectedVehicle.nextImportantDate).toLocaleDateString('fr-FR')}
                                                    tooltip={false}
                                                    inverseColors={true}
                                                />
                                            </div>

                                            <Button
                                                whiteSecondary
                                                compact={!isMobile && !isTablet}
                                                medium={isMobile || isTabletPortrait}
                                                label={this.props.t('accessoriesButton')}
                                                onClick={() => {
                                                    window.open(selectedVehicle.accessoriesLink || this.state.fallbackAccessoriesUrl, '_blank')
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div
                                className={classnames({
                                    'authenticated-home-container': true,
                                    ...responsive,
                                })}
                            >
                                {this.props.featuredContents.length || this.state.featuredContentsLoading ? (
                                    <div className={'authenticated-home-column'}>
                                        <section>
                                            <h2 className='sticky-title'>{this.props.t('benefitsTitle')}</h2>
                                            <div
                                                className={classnames({
                                                    'authenticated-home-cards-container': true,
                                                    ...responsive,
                                                })}
                                            >
                                                {this.state && this.state.featuredContentsLoading ? (
                                                    <div className='authenticated-home-loader'>
                                                        <Loader/>
                                                    </div>
                                                ) : (
                                                    <FeaturedContentCardList
                                                        featured={this.props.featuredContents}
                                                        goToArticle={this.goToArticle}
                                                        openModal={(v) => {
                                                            this.setState({currentDeal: v, isOpen: 'currentDeal'});
                                                            trackDealModalView(v);
                                                        }}
                                                        openGameModal={(v) => {
                                                            this.setState({currentGame: v, isOpen: 'currentGame'});
                                                        }}
                                                    />
                                                )}
                                                {this.state.currentDeal && (
                                                    <DealDetailsModal
                                                        onRequestClose={() => this.setState({isOpen: false})}
                                                        visible={this.state.isOpen === 'currentDeal'}
                                                        deal={this.state.currentDeal}
                                                    />
                                                )}
                                                {this.state.currentGame && (
                                                    <GameDetailsModal
                                                        user={this.props.User}
                                                        onRequestClose={() => this.setState({
                                                            isOpen: false,
                                                            currentGame: null,
                                                            isValid: false,
                                                            errorGame: []
                                                        })}
                                                        visible={this.state.isOpen === 'currentGame'}
                                                        game={this.state.currentGame}
                                                        participate={(id) => this.participate(id)}
                                                        errors={this.state.errorGame}
                                                        isValid={this.state.isValid}
                                                        participations={this.state.participations}
                                                    />
                                                )}
                                                <div className='authenticated-home-buttons'>
                                                    <Button primary link center label={this.props.t('benefitsButton')}
                                                            onClick={this.goToDeals}/>
                                                    <Button primary link center label={this.props.t('newsButton')}
                                                            onClick={this.goToNews}/>
                                                    <Button primary link center label={this.props.t('advicesButton')}
                                                            onClick={this.goToArticles}/>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                ) : (
                                    false
                                )}

                                <div className={classnames({'authenticated-home-column': true, ...responsive})}>
                                    <section>
                                        <h2 className='sticky-title'>{this.props.t('dealershipTitle')}</h2>
                                        <div className='authenticated-home-infos-container'>
                                            {this.props.userDealership && this.props.userDealership.address && (
                                                <DealershipInformation
                                                    dealershipName={this.props.userDealership.name}
                                                    dealershipAddress={this.props.userDealership.address}
                                                    dealershipPhone={this.props.userDealership.phone}
                                                    dealershipSuzukiUrl={this.props.userDealership.url}
                                                    inverseColors
                                                />
                                            )}
                                            <div
                                                className={classnames({
                                                    'authenticated-home-infos-buttons-block': true,
                                                    dealership: true,
                                                    ...responsive,
                                                })}
                                            >
                                                <div className='authenticated-home-infos-buttons-container'>
                                                    <DealerShipMeetingRequestLink small compact tertiary/>

                                                    <Button
                                                        whiteSecondary
                                                        compact
                                                        small
                                                        onClick={this.goToDealership}
                                                        label={this.props.t(
                                                            this.props.userDealership && this.props.userDealership.address
                                                                ? 'dealershipButton'
                                                                : 'chooseDealershipButton'
                                                        )}
                                                    />
                                                </div>

                                                {this.props.userDealership && this.props.userDealership.address && (
                                                    <Button
                                                        primary
                                                        link
                                                        whiteSecondary
                                                        label={this.props.t('dealershipContact')}
                                                        onClick={this.goToDealership}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <h2 className='sticky-title'>{this.props.t('vehicleTitle')}</h2>
                                        <div className='authenticated-home-infos-container'>
                                            {vehicle.get('nextImportantDateType') && vehicle.get('nextImportantDate') && (
                                                <div
                                                    className={classnames({
                                                        'authenticated-home-vehicle-next-date-container': true,
                                                        ...responsive,
                                                    })}
                                                >
                                                    <Icon size='2.5rem' color={ICON_COLORS.SECONDARY}
                                                          name={ICON_NAMES.CALENDAR}/>
                                                    <VehicleNextDate
                                                        type={vehicle.get('nextImportantDateType')}
                                                        date={new Date(vehicle.get('nextImportantDate')).toLocaleDateString('fr-FR')}
                                                        tooltip={false}
                                                        inverseColors={true}
                                                    />
                                                </div>
                                            )}
                                            <VehicleForm onVehicleSelected={(vehicle) => this.setState({vehicle})}/>
                                            <div
                                                className={classnames({
                                                    'authenticated-home-infos-buttons-container': true,
                                                    vehicle: true,
                                                    ...responsive,
                                                })}
                                            >
                                                <Button
                                                    primary
                                                    link
                                                    whiteSecondary
                                                    label={this.props.t('vehicleMaintenanceProgram')}
                                                    onClick={this.goToVehicles}
                                                />
                                                <Button
                                                    whiteSecondary
                                                    compact={!isMobile && !isTablet}
                                                    medium={isMobile || isTabletPortrait}
                                                    onClick={this.goToMyVehicles}
                                                    label={this.props.t('vehicleButton')}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

Scene.propTypes = {};

const ReduxConnectedScene = connect(
    (state) => ({
        userDealership: UserDealershipUtils.getUserDealershipFromState(state).toJS(),
        vehicle: UserVehiclesUtils.getUserFirstVehicleFromState(state),
        vehicles: UserVehiclesUtils.getUserVehiclesFromState(state),
        featuredContents: FeaturedContentUtils.getFeaturedContentsFromState(state),
        banners: BannersUtils.getBannersFromState(state),
        User: UserInformationsUtils.getUserFromState(state),
    }),
    (dispatch) => ({
        refreshUser: () => dispatch(UserInformationsActioner.getUserInformations()),
        getFeaturedContents: () => dispatch(FeaturedContentsActioner.getFeaturedContents()),
        resetFeaturedContents: () => dispatch(FeaturedContentsActioner.resetFeaturedContents()),
        getBanners: () => dispatch(BannersActioner.getBanners()),
        resetBanners: () => dispatch(BannersActioner.resetBanners()),
        participateGame: (id) => dispatch(UserGamesActioner.participateGame(id)),
        userParticipatedToGame: (id) => dispatch(UserGamesActioner.userParticipatedToGame(id)),
    })
)(Scene);

const TranslatedConnectedScene = translate('authenticatedHome', {wait: true})(ReduxConnectedScene);
export {TranslatedConnectedScene as Scene};
