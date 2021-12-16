import React, { Component } from "react";
import { translate } from "react-i18next";
import { DeviceContextConsumer } from "../../contexts/Device";
import { Modal } from "../components";
import "./CguModal.scss";

class CguModal extends Component {
    render() {
        return (
            <DeviceContextConsumer>
                {({ isMobile }) => (
                    <Modal
                        visible={this.props.visible}
                        onRequestClose={this.props.onRequestClose}
                        mobile={isMobile}
                        large
                    >
                        <article className="cgu-container">
                            <h2 className="cgu-title">{this.props.t("cgu.title")}</h2>
                            <h3>Article 1</h3>
                            <p>Sed pretium est lacus, sed aliquam enim ultricies in. Maecenas eros purus, efficitur pulvinar tincidunt consectetur, euismod sit amet purus. Praesent laoreet vitae arcu non rhoncus. Praesent rutrum, elit id finibus maximus, metus odio aliquet justo, ac accumsan diam enim a quam. Suspendisse tortor enim, ornare sed commodo nec, sagittis vel ipsum. Suspendisse leo metus, suscipit a ipsum lobortis, laoreet imperdiet libero. Vestibulum pulvinar congue finibus. Nam lectus ipsum, tincidunt quis urna sit amet, laoreet mollis eros.</p>
                            <h3>Article 2</h3>
                            <p>Pellentesque accumsan, nibh nec aliquam tristique, enim nisl venenatis neque, consectetur finibus ante purus id nunc. Maecenas tempor massa vel eleifend luctus. Pellentesque suscipit molestie odio quis tempor. Morbi dapibus sapien sed urna posuere, sed convallis erat gravida. Nullam nulla orci, convallis et nulla quis, pharetra vehicula arcu. Duis non placerat lorem, sit amet molestie sem. Aliquam finibus egestas pulvinar. In imperdiet consequat pellentesque. Etiam facilisis consectetur congue. Phasellus fringilla id libero ac lobortis. Fusce fermentum libero eget velit malesuada, vel placerat est feugiat. Fusce convallis aliquam purus, vitae ultricies sem.</p>
                            <p>Aliquam scelerisque, urna et tincidunt posuere, nisi erat commodo nibh, in molestie lectus ipsum et dui. Mauris vulputate porta dui, a convallis felis scelerisque id. Sed quis metus lobortis, dapibus purus ut, imperdiet arcu. Praesent convallis justo ut finibus hendrerit. Vestibulum fermentum semper pretium. Curabitur commodo eu libero vel egestas. Fusce pulvinar mauris at nunc cursus sollicitudin. Etiam tempor quam nisi, sit amet tristique risus iaculis a. Maecenas porttitor non dolor eget viverra. Fusce eget vehicula orci. Nullam volutpat risus nunc, vel commodo mi cursus nec. Aenean id sodales libero, ut ultrices massa.</p>
                            <h3>Article 3</h3>
                            <p>Integer nisl neque, rutrum a mollis vel, vehicula eget sapien. Vivamus vel rhoncus massa. In convallis enim tellus, sit amet rhoncus nibh egestas vitae. Sed tincidunt risus est, sed volutpat metus molestie non. Nam a sapien malesuada, dignissim eros eu, gravida tellus. Cras et urna non quam interdum egestas vitae ac tellus. Nullam a neque nunc. Nulla aliquet quam id nulla lobortis euismod. In mollis justo urna, maximus gravida velit finibus eu. Curabitur scelerisque id libero ac mattis.</p>
                            <h3>Article 4</h3>
                            <p>Vivamus ipsum nisl, vehicula commodo euismod eu, accumsan id sapien. Etiam ullamcorper orci eu tellus elementum, a dapibus nulla pretium. Phasellus aliquam ante non ipsum porttitor, nec euismod orci dignissim. Aliquam convallis orci eget turpis feugiat, et pellentesque tortor maximus. Etiam cursus purus id urna auctor pretium. Curabitur lacinia risus vel lectus bibendum tristique. Ut aliquam vestibulum purus. Nam eget elementum orci, sodales auctor ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut eu justo est. Nulla sed quam et nisl sodales egestas.</p>
                            <p>Donec ut ultrices odio. Proin nisi ligula, imperdiet quis erat sed, pulvinar iaculis dolor. Nunc sit amet ex leo. Praesent sit amet faucibus neque. Nullam a ipsum sit amet tellus viverra lobortis eget eget neque. Maecenas tincidunt eros et justo mattis, vitae lobortis libero fermentum. Aliquam condimentum et lorem in vulputate.</p>
                            <p>Suspendisse mollis eget velit eu gravida. Mauris eget libero scelerisque, facilisis tellus quis, porttitor ante. Phasellus hendrerit convallis rhoncus. Cras id dictum nisl. Nullam tellus lectus, feugiat nec rutrum a, sodales vitae libero. Maecenas finibus ex at mauris lobortis tincidunt. Quisque venenatis erat dolor, nec laoreet ex viverra vel. Sed sagittis turpis a diam condimentum placerat. Aliquam imperdiet pulvinar elit a facilisis.</p>
                            <h3>Article 5</h3>
                            <p>Donec at velit eu odio sagittis ultricies nec eget neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus pretium imperdiet orci et aliquam. Pellentesque nibh dolor, lacinia a mi in, gravida pellentesque augue. Nam tincidunt fermentum neque eget dapibus. Sed placerat tortor bibendum, hendrerit augue at, eleifend nisl. Aliquam lectus mi, fermentum eget ligula quis, iaculis vulputate mi. Vestibulum tristique metus ligula, nec congue nisl gravida a. Ut posuere, quam id rutrum dignissim, sem nibh fringilla dolor, in viverra ex quam et nulla. Etiam sit amet orci quis massa euismod congue vitae a purus. Nullam sit amet tristique diam. Maecenas luctus condimentum erat sed varius.</p>
                            <p>Cras mattis vitae felis et consectetur. In ac urna at mauris tempor feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam faucibus suscipit enim ac tempus. Curabitur quis orci vitae turpis aliquet volutpat. Integer vitae augue sed nisi eleifend laoreet nec eu ipsum. Vivamus at tincidunt ante, eu porttitor magna. Nam consectetur lectus et magna elementum, at tristique tellus hendrerit. Mauris sit amet tortor et velit imperdiet varius sed non sem. Pellentesque fermentum condimentum posuere. Etiam auctor nunc in malesuada sollicitudin.</p>
                            <p>Suspendisse non auctor magna. Sed at lorem turpis. Aenean viverra, ipsum non pharetra bibendum, tortor mi lacinia neque, vel sagittis arcu felis sit amet metus. Donec fermentum ac nulla lacinia placerat. Etiam vitae ultrices justo, in feugiat massa. Vestibulum euismod ex quis est porta tempor. Sed nisl nibh, pretium eget interdum ac, maximus at sem. Donec molestie feugiat purus, eu elementum tellus. Vestibulum convallis pretium nibh nec viverra. Praesent eu laoreet risus. Pellentesque turpis lacus, volutpat sed venenatis quis, convallis eget massa. In hac habitasse platea dictumst. Donec non odio pulvinar, suscipit orci non, pharetra enim. Curabitur ipsum arcu, pellentesque ut neque porttitor, aliquam gravida ligula. Nullam ut massa feugiat, varius leo sit amet, gravida dolor. Sed luctus turpis nec enim dapibus, quis suscipit risus aliquam.</p>
                        </article>
                    </Modal>
                )}
            </DeviceContextConsumer>
        );
    };
}

const translated = translate("common", { wait: true })(CguModal);
export { translated as CguModal };
