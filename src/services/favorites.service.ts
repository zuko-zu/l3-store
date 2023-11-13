import localforage from 'localforage';
import { ProductData } from 'types';

const FV_DB = '__wb-favourites';

class FavoritesService {
  init() {
    this._updCounters();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FV_DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(FV_DB, data);
    this._updCounters();
  }

  async isInFavorites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const link = document.querySelector('.favorites')

    //@ts-ignore
    document.querySelectorAll('.js__favorites-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    
    // @ts-ignore
    link.style.display = count ? 'block' : 'none';
  }
}

export const favoritesService = new FavoritesService();
