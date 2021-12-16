import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Banners.scss';
import classnames from 'classnames';
import { DeviceContextConsumer } from '../contexts';

class Banners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBanner: null,
      active: 0,
      interval: null,
    };
  }

  nextSlide = () => {
    const length = this.props.banners.length;
    let next = this.state.active + 1;

    if (next >= length) next = 0;
    this.changeSlide(next);
  };

  changeSlide = (id) => {
    let currentSlideButton = document.getElementById("banners-navigation__button--" + this.state.active);

    if (currentSlideButton !== null) {
      currentSlideButton.classList.remove("banners-navigation__button--current-slide");

      document.getElementById("banners-navigation__button--" + id)
          .classList.add("banners-navigation__button--current-slide");

      this.setState({
        active: id,
      });
    }
  };

  playSlider = () => {
    this.setState({
      interval: setInterval(this.nextSlide, 5000),
    });
  };

  pauseSlider = () => {
    clearInterval(this.state.interval);

    this.setState({
      interval: null,
    });
  };

  openLink = (banner) => {
    if (banner.link) {
      window.open(banner.link, '_blank');
    }
  };

  componentDidMount() {
    this.playSlider();
  }

  render() {
    return (
        <DeviceContextConsumer>
          {({isMobile, isMobileSmall, isTablet}) => {
            const responsive = {mobile: isMobile, 'mobile-small': isMobileSmall, tablet: isTablet};

            return (
                <div>
                  <div className={classnames({banners: true, ...responsive})}>
                    {this.props.banners.map((banner, id) => {
                      return (
                          <picture
                              className={classnames({
                                'banners-slide': true,
                                'banners-slide--active': id === this.state.active,
                                'banners-slide--clickable': !!banner.link,
                              })}
                              onMouseEnter={this.pauseSlider}
                              onMouseLeave={this.playSlider}
                              onClick={() => this.openLink(banner)}
                              key={id}
                          >
                            <source media='(max-width: 768px)' srcSet={banner.mobileImage.large}/>
                            <source media='(min-width: 769px)' srcSet={banner.desktopImage.large}/>
                            <img className='banners-image' src={banner.desktopImage.large}/>
                          </picture>
                      );
                    })}
                  </div>

                  <div className={classnames({'banners-navigation': true, ...responsive})}>
                    {this.props.banners.map((banner, id) => {
                      return (
                          <div id={"banners-navigation__button--" + id}
                               className={
                                 "banners-navigation__button" +
                                 ((id === 0) ? " banners-navigation__button--current-slide" : "")
                               }
                               onClick={() => this.changeSlide(id)}/>
                      );
                    })}
                  </div>

                </div>
            );
          }}
        </DeviceContextConsumer>
    );
  }
}

Banners.defaultProps =
    {
      banners: [],
    }
;

Banners.propTypes =
    {
      banners: PropTypes.array,
    }
;

export {
  Banners
};
