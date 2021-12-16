import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Modal, DeviceContextConsumer, Button, RegisterForm, Checkbox } from '../../../../../../../components';
import { translate } from 'react-i18next';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  AuthenticationUtils,
  UserInformationsActioner
} from '../../../../../../../services';

import './GameDetailsModal.scss';

class GameDetailsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emptyRequiredFields: [],
      userFields: [],
      acceptRules: false,
      email: false,
      sms: false,
    };
  }

  mapRequiredFields = {
    address: ['street', 'zipCode', 'city'],
  };
  
  mapSingleRequiredFields = {
    phone: ['mobilePhone', 'landlinePhone'],
  }

  handleModalRequestClose = () => {
    this.setState({
      emptyRequiredFields: [],
      userFields: [],
      acceptRules: false,
    });

    this.props.onRequestClose();
  };

  participate = () => {
    this.props.participate(this.props.game['@id']);
  };

  getEmptyRequiredFields = (game = this.props.game) => {
    const user = this.props.user && this.props.user.toJS();
    this.state.emptyRequiredFields = [];
    this.state.userFields = [];

    if (game && game.requiredFields) {
      game.requiredFields.map(field => {
        if (user[field] && (typeof user[field] === 'object')) {
          const requiredFields = this.mapRequiredFields[field].filter(reqField => {
            return !user[field][reqField];
          });

          !!requiredFields.length ?
            this.state.emptyRequiredFields.push(field) :
            this.state.userFields.push({field: field, value: Object.values(user[field]).join(' ')});

          return;
        }

        if (!user[field] && !this.mapRequiredFields[field] && !this.mapSingleRequiredFields[field]) {
          this.state.emptyRequiredFields.push(field);
          return;
        }

        if (this.mapSingleRequiredFields[field]) {
          const validFields = [];
          const requiredField = this.mapSingleRequiredFields[field].filter(reqField => {
            if (user[reqField] && user[reqField].length) {
              validFields.push({field: field, value: user[reqField]});
              return;
            }

            return user[reqField];
          });

          (!requiredField.length && !validFields.length) ?
            this.state.emptyRequiredFields.push(field) :
            this.state.userFields.push(...validFields);

          return;
        }

        this.state.userFields.push({field: field, value: user[field]});
      });
    }
  };

  optinUser = (name, value) => {
    this.setState({ [name]: value });

    const optin = Object.assign({
      email: this.state.email,
      sms: this.state.sms
    }, {[name]: value});

    this.props.updateUser({ optin });
  };

  getOptinFromUser = () => {
    const u = this.props.user && this.props.user.toJS();
    if (u) {
      this.setState({
        email: u.optin.email,
        sms: u.optin.sms,
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;

    if (
      this.state !== nextState ||
      this.props.game !== nextProps.game ||
      this.props.errors.length !== nextProps.errors.length ||
      this.props.user !== nextProps.user ||
      this.props.isValid !== nextProps.isValid ||
      this.props.participations !== nextProps.participations
    ) {
      this.getEmptyRequiredFields(nextProps.game);

      shouldUpdate = true;
    }

    return shouldUpdate;
  };

  userAlreadyParticipates = () => {
    const { participations, game } = this.props;

    return participations.filter(p => p.game === game['@id']).length;
  };

  componentDidMount() {
    this.getEmptyRequiredFields();
    this.getOptinFromUser();
  };

  render() {
    const { game, errors, user, isValid } = this.props;
    const { emptyRequiredFields, userFields, acceptRules, email, sms } = this.state;

    const u = user && user.toJS();

    const labelCGU = (
        <span>
          {this.props.t('modal.optin.acceptRules')}
          <a href={game.rulesUrl} target="_blank" className="text-underline">{this.props.t('modal.optin.CGU')}</a>
        </span>
    )

    return (
      <Modal visible={this.props.visible} onRequestClose={this.handleModalRequestClose}>
        <DeviceContextConsumer>
          {({ isMobile }) => (
            game && (
              <article className={classnames({ "game-details-modal": true, mobile: isMobile })}>
                <h2 className={classnames({ "game-details-modal-title": true, mobile: isMobile })}>
                  { game.title }
                </h2>

                {!this.userAlreadyParticipates() && (game.participationsLeft === 0) ?
                  <p>
                    <span>
                      {this.props.t('sorryEmptyStock')}
                    </span>
                  </p>
                  :
                  <div>
                    {game.maximumParticipants !== null && !isValid &&
                      <p className="game-details-modal-subtitle"><em>{ game.participationsLeft } { this.props.t('placesLeft', {count: game.participationsLeft}) }</em></p>
                    }
    
                    {!isValid && 
                      <div>
                        <p className="game-details-modal-available">
                          { this.props.t('modal.availableUntil') } <em>{ moment(game.endDate).format('L') }</em> {game.maximumParticipants && this.props.t('modal.orEmptyStock') } { this.props.t('modal.toParticipate') }
                        </p>
      
                        <p>{ game.summary }</p>
                      </div>
                    }
    
                    {isValid || this.userAlreadyParticipates() ? 
                      <p className="game-details-modal-valid">{this.props.t('thanks', { game: game.title})}</p>
                      :
                      <div>
                        {userFields.map((u, index) => {
                          return (
                            <div key={index} className="game-details-modal-values">
                              <span>{this.props.t(`requiredFields.${u.field}`)} :</span>
                              <span>{u.value}</span>
                            </div>
                          )})
                        }
                        
                        {emptyRequiredFields.length > 0 && (
                          <div>
                            <RegisterForm
                              user={u}
                              askForPhone={emptyRequiredFields.indexOf('phone') > -1}
                              askForAddress={emptyRequiredFields.indexOf('address') > -1}
                              nextAction={this.props.refreshUser}
                            />
                          </div>
                        )}
    
                        <div className="game-details-modal-values checkbox border">
                          <Checkbox
                            id="rules"
                            name="rules"
                            label={labelCGU}
                            onValueChanged={(value) => this.setState({ acceptRules: value })}
                            error={errors.acceptRules}
                          />
                        </div>
    
                        {game.requiredFields && game.requiredFields.indexOf('email') > -1 && 
                          <div className="game-details-modal-values checkbox border">
                            <Checkbox
                              id="optinEmail"
                              name="optinEmail"
                              initialValue={u.optin.email}
                              label={this.props.t('modal.optin.commercialEmailContact')}
                              onValueChanged={(value) => this.optinUser('email', value)}
                              error={errors.email}
                            />
                          </div>
                        }
    
                        {game.requiredFields && game.requiredFields.indexOf('phone') > -1 && 
                          <div className="game-details-modal-values checkbox border">
                            <Checkbox
                              id="optinSms"
                              name="optinSms"
                              initialValue={u.optin.sms}
                              label={this.props.t('modal.optin.commercialSmsContact')}
                              onValueChanged={(value) => this.optinUser('sms', value)}
                              error={errors.phone}
                            />
                          </div>
                        }
    
                        {!!errors.length && errors.map((error, index) => {
                          return (
                            <p className="game-details-modal-error" key={index}>
                              {error.message}
                            </p>
                          )
                        })}
    
                        <Button
                          primary
                          center
                          label={ this.props.t('modal.validateParticipation') }
                          onClick={this.participate}
                          initialValue={acceptRules}
                          disabled={
                            !!emptyRequiredFields.length ||
                            !acceptRules
                          }
                        />
                      </div>
                    }
                  </div>
                }
              </article>
            )
          )}
        </DeviceContextConsumer>
      </Modal>
    );
  }
}

GameDetailsModal.defaultProps = {
  onRequestClose: () => {},
  visible: false,
  participate: () => {},
  participations: [],
  errors: [],
};

GameDetailsModal.propTypes = {
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
  participate: PropTypes.func,
  participations: PropTypes.array,
  errors: PropTypes.array,
};

const connectedComponent = connect(
  (state) => ({
    isAuthenticated: AuthenticationUtils.isAuthenticated(state),
  }),
  (dispatch) => ({
    getUser: () => dispatch(UserInformationsActioner.getUserInformations()),
    refreshUser: () => dispatch(UserInformationsActioner.refreshUserInformations()),
    updateUser: (values) => dispatch(UserInformationsActioner.updateUserInformations(values)),
  })
)(GameDetailsModal);

const TranslatedGameDetailsModal = translate("game", { wait: true })(connectedComponent);
export { TranslatedGameDetailsModal as GameDetailsModal };
