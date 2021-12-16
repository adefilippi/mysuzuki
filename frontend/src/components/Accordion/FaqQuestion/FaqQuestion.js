import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as striptags from "striptags";

import {ICON_COLORS, ICON_NAMES} from "../../index";
import {Icon} from "../../Icon";
import {DeviceContextConsumer} from "../../contexts/Device";
import {Link} from "../../Link";
import {PATHS} from "../../../routes/paths";


import "./FaqQuestion.scss";

class FaqQuestion extends Component {

    render() {
        const allowed_tags = "<ul><ol><li><strong><em><u><s><br><p><span><a>";

        return (
            <DeviceContextConsumer>
                {({ isMobile, isMobileSmall, isTablet }) => {
                    const responsive = { mobile: isMobile, "mobile-small": isMobileSmall, tablet: isTablet };
                    const {
                      associatedQuestions,
                      topicId,
                      question,
                      id,
                      isOpen,
                      answer,
                      handleHeaderClick
                    } = this.props;

                    return (
                        <section id={`question-${id}`} className={classnames({"faq-question": true, ...responsive})}>
                            <header className="faq-question-header" onClick={() => handleHeaderClick(id)}>
                                <h3 className="faq-question-title">{question}</h3>
                                <Icon
                                    name={ICON_NAMES[`${isOpen ? 'ARROW_UP' : 'ARROW_DOWN'}`]}
                                    color={ICON_COLORS.CURRENT} size="16px"
                                />
                            </header>
                            { isOpen && (
                                <article
                                    className="faq-question-answer"
                                >
                                    <div
                                        dangerouslySetInnerHTML={{__html: striptags(answer, allowed_tags)}}
                                    />
                                    { associatedQuestions.length > 0 && associatedQuestions.map((question, index) =>
                                        <Link
                                            link
                                            key={index}
                                            internalRedirection
                                            attributes={{
                                                href: PATHS.FAQ.TOPIC.QUESTION.buildPath(topicId, question.id)
                                            }}
                                            label={question.question}
                                        />
                                    )}
                                </article>
                            )}
                        </section>
                    );
                }}
            </DeviceContextConsumer>
        );
    }
}

FaqQuestion.defaultProps = {
    associatedQuestions: [],
    isOpen: false,
};

FaqQuestion.propTypes = {
    isOpen: PropTypes.bool,
    question: PropTypes.string,
    associatedQuestions: PropTypes.array,
    answer: PropTypes.string
};

export { FaqQuestion };
