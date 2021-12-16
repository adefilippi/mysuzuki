import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Icon, ICON_NAMES } from "./";

storiesOf("Icon", module)
  .add("Mail Icon", () => <Icon color={"#003145"} name={ICON_NAMES.MAIL} onClick={action("clicked")} />)
  .add("Phone Icon", () => <Icon color={"#003145"} name={ICON_NAMES.PHONE} onClick={action("clicked")} />)
  .add("FB Icon", () => <Icon color={"#003145"} name={ICON_NAMES.FB} onClick={action("clicked")} />)
  .add("YT Icon", () => <Icon color={"#003145"} name={ICON_NAMES.YT} onClick={action("clicked")} />)
  .add("Insta Icon", () => <Icon color={"#003145"} name={ICON_NAMES.INSTA} onClick={action("clicked")} />)
  .add("Arrow Left Icon", () => <Icon color={"#003145"} name={ICON_NAMES.ARROW_LEFT} onClick={action("clicked")} />)
  .add("Arrow Link Icon", () => <Icon color={"#003145"} name={ICON_NAMES.ARROW_LINK} onClick={action("clicked")} />)
  .add("Arrow Link Down Icon", () => <Icon color={"#003145"} name={ICON_NAMES.ARROW_LINK_DOWN} onClick={action("clicked")} />)
  .add("Arrow Up Icon", () => <Icon color={"#003145"} name={ICON_NAMES.ARROW_UP} onClick={action("clicked")} />)
  .add("Arrow Down Icon", () => <Icon color={"#003145"} name={ICON_NAMES.ARROW_DOWN} onClick={action("clicked")} />)
  .add("Search Icon", () => <Icon color={"#003145"} name={ICON_NAMES.SEARCH} onClick={action("clicked")} />)
  .add("Closing Icon", () => <Icon color={"#003145"} name={ICON_NAMES.CLOSING} onClick={action("clicked")} />)
  .add("Pencil Icon", () => <Icon color={"#003145"} name={ICON_NAMES.PENCIL} onClick={action("clicked")} />)
  .add("Localiser Icon", () => <Icon color={"#003145"} name={ICON_NAMES.LOCALISER} onClick={action("clicked")} />)
  .add("Add Icon", () => <Icon color={"#003145"} name={ICON_NAMES.ADD} onClick={action("clicked")} />)
  .add("Delete Icon", () => <Icon color={"#003145"} name={ICON_NAMES.DELETE} onClick={action("clicked")} />)
  .add("Tooltip Icon", () => <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}><Icon name={ICON_NAMES.TOOLTIP} onClick={action("clicked")} /></div>)
  .add("Calendar Icon", () => <div style={{ backgroundColor: "#EFF3F4", padding: "50px" }}><Icon name={ICON_NAMES.CALENDAR} onClick={action("clicked")} /></div>)
  .add("Skew Icon", () => <Icon name={ICON_NAMES.SKEW} color={"#003145"}/>)
  .add("Review Icon", () => <Icon name={ICON_NAMES.REVIEW} color={"#003145"}/>)
  .add("Tools Icon", () => <Icon name={ICON_NAMES.TOOLS} color={"#003145"}/>)
  .add("Shake Hands Icon", () => <Icon name={ICON_NAMES.SHAKE_HANDS} color={"#003145"}/>)
  .add("Look Icon", () => <Icon color={"#003145"} name={ICON_NAMES.LOOK} onClick={action("clicked")} />);
