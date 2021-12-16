import React, {Component} from "react";
import {Icon, ICON_NAMES, Loader} from "../../../components";
import {SignInActioner, UserActioner, UserInformationsUtils} from "../../../services";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import './AdminSession.scss';

class Scene extends Component {
    token;

    constructor() {
        super();
        this.state = { error: false };
    }

    render() {
        return (
            <div className={'admin-session'}>
                {!this.state.error &&
                    <div className={'admin-session__loader admin-session__loader--loading'}>
                        <Loader/>
                        <p>En cours de connexion...</p>
                    </div>
                }

                {this.state.error &&
                    <div className={'admin-session__loader admin-session__loader--error'}>
                        <p>Une erreur est survenue. Veuillez réessayer.</p>
                        <button className={'button'} onClick={ this.refreshPage }>Réessayer</button>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.token = this.props.match.params.token;

        this.props.signIn(this.token)
            .then(() => window.location.replace("/"))
            .catch(error => this.setState({ error: true }));
    }

    refreshPage() {
        window.location.reload(false);
    }
}

const ReduxConnectedComponent = connect(
    (state) => ({
        username: UserInformationsUtils.getUserNameFromState(state),
        user: UserInformationsUtils.getUserFromState(state)
    }),
    (dispatch) => ({
        signOut: () => dispatch(UserActioner.signout()),
        signIn: (token) => dispatch(SignInActioner.loginFromToken(token))
    })
)(Scene);

const TranslatedAdminSession = translate("common", {wait: true})(ReduxConnectedComponent);

export {TranslatedAdminSession as AdminSession};
