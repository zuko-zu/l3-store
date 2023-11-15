import localforage from 'localforage';
import { genUUID } from '../utils/helpers';

const ID_DB = '__wb-userId';

class UserService {
  private cachedUserId: string | null = null

  async init() {
    const id = await this.getId()
    console.warn('UserID: ', id);
  }

  async getId(): Promise<string> {
    if (this.cachedUserId) {
      return this.cachedUserId;
    }
    let id = await localforage.getItem(ID_DB) as string;

    if (!id) id = await this._setId();

    this.cachedUserId = id;
    return id;
  }

  private async _setId(): Promise<string> {
    const id = genUUID();
    await localforage.setItem(ID_DB, id);
    this.cachedUserId = id;
    return id;
  }
}

export const userService = new UserService();