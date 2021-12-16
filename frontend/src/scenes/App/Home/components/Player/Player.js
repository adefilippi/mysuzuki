import React, { Component } from "react";
import { translate } from "react-i18next";
import YouTube from "react-youtube";
import "./Player.scss";

class Player extends Component {
  render() {
    return (
      <div className="home-player">
        <h2 className="home-player-title">{this.props.t("playerTitle")}</h2>
        <div className="home-player-content">
          <YouTube
            videoId="eTF-e92at0c"
            opts={{
              width: "420",
              height: "240",
              playerVars: {
                controls: 0,
                showinfo: 0,
                modestbranding: 0,
              },
            }}
          />
        </div>
      </div>
    );
  }
}

Player.defaultProps = {};

Player.propTypes = {};

const TranslatedPlayer = translate("home", { wait: true })(Player);
export { TranslatedPlayer as Player };
