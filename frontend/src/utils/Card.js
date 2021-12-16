import moment from 'moment';

export class Card {
  static getDealShortText(text, length = 100) {
    if (!text || text.length < length) {
      return text;
    }
    text = text.substring(0, length);
    const last = text.lastIndexOf(' ');
    text = text.substring(0, last);
    return text + '...';
  }

  /**
   * Cheap solution to factorize different deal cards
   */
  static getDealCardData(deal, translatorCallback = (str) => str) {
    if (!deal) {
      return {};
    }

    const type = deal.type;
    let endDate = !deal.endDate
      ? null
      : translatorCallback('dealCard.endDateUntil') + moment(deal.endDate).format('L');
    // Image
    let image = deal.image;
    if (image) {
      image = {
        small: image.small,
        large: image.large,
      };
    }
    // Automated
    let discount = null;
    if (deal.automated) {
      switch (deal.reductionType) {
        case 'pourcent':
          discount = `-${deal.value}%`;
          break;
        case 'montant':
          discount = `-${deal.value}€`;
          break;
        case 'gratuité':
          discount = translatorCallback('dealCard.reductionType.free');
          break;
      }
    }
    let dealership = deal.dealership;
    if (dealership) {
      dealership = dealership.name;
    }
    // Welcome
    const isWelcomeOffer = type === 'welcome-offer';

    // Avantage Offer
    const isAvantageOffer = type === 'avantage-offer';

    return {
        title: deal.title,
        type,
        isWelcomeOffer,
        isAvantageOffer,
        image,
        discount,
        dealership,
        endDate,
        summary: deal.summary
    };
  }
}
