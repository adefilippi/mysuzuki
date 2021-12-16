import React, { Component } from "react";
import classnames from "classnames";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { DeviceContextConsumer, AccordionSection, FaqQuestion, Loader, Link, ICON_NAMES, IssueModal, Container } from "../../../components";
import {
    TopicsActioner,
    UserInformationsUtils,
    UserVehiclesUtils,
    UserInformationsActioner,
} from "../../../services";
import { Modal } from "../../../utils";
import { NavBar } from "../Home/AuthenticatedHome/components/NavBar";
import { PATHS } from "../../../routes/paths";

import "../Home/AuthenticatedHome/Account/Scene.scss"
import "./Faq.scss"

class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
        this.modal = new Modal(this);
    }

    componentDidMount() {
        this.props.resetTopics();
        this.setState({ loading: true, }, this.getTopics);
    }

    componentWillMount() {
        this.props.refreshUser();
    }

    getTopics = () => {
        this.props.getTopics().finally(() => this.setState({loading: false}));
    };

    handleQuestionHeaderClick = (topicId, questionId) => {
      if(this.props.match.params.questionId === questionId.toString()){
        this.props.history.push(PATHS.FAQ.TOPIC.buildPath(topicId))
      }else{
        this.props.history.push(PATHS.FAQ.TOPIC.QUESTION.buildPath(topicId, questionId));
      }
    }

    handleTopicHeaderClick = (topicId) => {
      if(this.props.match.params.topicId === topicId.toString()){
        this.props.history.push(PATHS.FAQ.ROOT)
      }else{
        this.props.history.push(PATHS.FAQ.TOPIC.buildPath(topicId));
      }
    }

    render() {
        return (
            <Container>
                <DeviceContextConsumer>
                    {({ isMobile, isMobileSmall, isTabletPortrait, isTabletLandscape, isTablet }) => {
                        const responsive = {
                            "mobile": isMobile,
                            "mobile-small": isMobileSmall,
                            "tablet": isTablet,
                            "tablet-portrait": isTabletPortrait,
                            "tablet-landscape": isTabletLandscape
                        };

                        const {
                            topics,
                            t,
                            userName,
                            userEmail,
                            vehicles,
                        } = this.props;

                        const {
                            modal,
                        } = this;

                        const {
                            loading
                        } = this.state;

                        return (
                            <div className="faq">
                                <NavBar />
                                <section className={classnames({"faq-header": true, ...responsive})}>
                                    <h1 className={classnames({"my-account-title": true, ...responsive})}>
                                        {this.props.t("title")}
                                    </h1>
                                    <Link
                                        label={this.props.t("otherQuestion")}
                                        attributes={{
                                            type: "button",
                                            onClick: modal.openModal
                                        }}
                                        medium
                                    />
                                </section>
                                <section className={classnames({"my-account-container": true, ...responsive})}>
                                    { loading && (
                                        <div className="deals-loader">
                                            <Loader />
                                        </div>
                                    )}
                                    { topics.toJS().map((topic, index) => {
                                        const icon =
                                            topic.icon
                                            ? { iconUrl: topic.icon }
                                            : { iconName: ICON_NAMES.TOOLTIP }
                                        ;
                                        const isOpen =
                                          index.toString()
                                          === this.props.match.params.topicId;

                                        return (
                                            <AccordionSection
                                                key={index}
                                                title={topic.label}
                                                {...icon}
                                                handleHeaderClick={() => this.handleTopicHeaderClick(index)}
                                                isOpen={isOpen}
                                            >
                                                { topic.questions.map((question, index2) => (
                                                    <FaqQuestion
                                                        key={index2}
                                                        topicId={index}
                                                        question={question.question}
                                                        answer={question.answer}
                                                        associatedQuestions={question.associatedQuestions}
                                                        handleHeaderClick={(questionId) => this.handleQuestionHeaderClick(index, questionId)}
                                                        isOpen={this.props.match.params.questionId === question.id.toString()}
                                                        id={question.id}
                                                    />
                                                ))}
                                            </AccordionSection>
                                        );
                                    })}
                                    <Link
                                        label={this.props.t("otherQuestion")}
                                        attributes={{
                                            type: "button",
                                            onClick: modal.openModal
                                        }}
                                        medium
                                    />
                                </section>
                                <IssueModal
                                    {...modal.attr()}
                                    title={t("modal.title")}
                                    askForVin={!userName}
                                    askForName={!userName}
                                    name={userName}
                                    email={userEmail}
                                    vehicles={userName && vehicles}
                                />
                            </div>
                        );
                    }}
                </DeviceContextConsumer>
            </Container>
        );
    }
}

Scene.propTypes = {};

const connected = connect(
    (state) => ({
        topics: state.Topics,
        userName: UserInformationsUtils.getUserNameFromState(state),
        userEmail: UserInformationsUtils.getUserEmailFromState(state),
        vehicles: UserVehiclesUtils.getUserVehiclesFromState(state),
    }),
    (dispatch) => ({
        getTopics: () => dispatch(TopicsActioner.get()),
        resetTopics: () => dispatch(TopicsActioner.reset()),
        refreshUser: () => dispatch(UserInformationsActioner.getUserInformations())
    })
)(Scene);

const translated = translate("faq", { wait: true })(connected);
export { translated as Scene };
