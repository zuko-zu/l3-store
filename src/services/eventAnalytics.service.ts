import { ProductData } from 'types';
import { genUUID } from '../utils/helpers';

const apiURL = '/api/sendEvent';

enum EventType {
  Route = 'route',
  ViewCard = 'viewCard',
  ViewCardPromo = 'viewCardPromo',
  AddToCart = 'addToCart',
  Purchase = 'purchase'
}

interface AnalyticsEventData {
  type: EventType;
  payload: object;
  timestamp: number;
}

class AnalyticsService {
  private apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  private async sendEvent(payload: AnalyticsEventData) {
    try {
      fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Что-то пошло не так при отправке запроса аналитики событий', error);
    }
  }

  async trackPageVisit(url: string) {
    this.sendEvent({
      type: EventType.Route,
      payload: { url },
      timestamp: Date.now()
    });
  }

  async trackViewCard(cardProperties: ProductData) {
    this.sendEvent({
      type: Object.keys(cardProperties.log).length > 0 ? EventType.ViewCardPromo : EventType.ViewCard,
      payload: cardProperties,
      timestamp: Date.now()
    });
  }

  async trackAddToCart(productProperties: ProductData) {
    this.sendEvent({
      type: EventType.AddToCart,
      payload: productProperties,
      timestamp: Date.now()
    });
  }

  async trackPurchase(products: ProductData[]) {
    const totalPrice = products.reduce((acc, product) => (acc += product.salePriceU), 0);
    const productIds = products.map((product) => product.id);
    const orderId = genUUID();

    this.sendEvent({
      type: EventType.Purchase,
      payload: {
        orderId,
        totalPrice,
        productIds
      },
      timestamp: Date.now()
    });
  }
}

export const analyticsService = new AnalyticsService(apiURL);
