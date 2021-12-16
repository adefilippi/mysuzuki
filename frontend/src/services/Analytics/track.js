import * as ReactGA from "react-ga";

export function trackDealModalView(deal) {
  trackDeal(deal, 'ModalView');
}

export function trackDealCtaClick(deal) {
  trackDeal(deal, 'CtaClick');
}

function trackDeal(deal, action) {
  const id = deal && deal.id;
  const title = deal && (deal.label || deal.title);

  if (id && title) {
    ReactGA.event({
      category: 'Offer',
      action: action,
      label: title,
      value: id
    });
  }
}
