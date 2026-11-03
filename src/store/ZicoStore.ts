import {makeAutoObservable, runInAction} from 'mobx';
import * as Keychain from 'react-native-keychain';

const ZICO_TOKEN_SERVICE = 'zico_ai_token';

class ZicoStore {
  token = '';
  isConnected = false;

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
  }

  async loadToken() {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: ZICO_TOKEN_SERVICE,
      });

      runInAction(() => {
        this.token = credentials ? credentials.password : '';
      });
    } catch {
      runInAction(() => {
        this.token = '';
      });
    }
  }

  async setToken(token: string) {
    try {
      await Keychain.setGenericPassword('zico', token, {
        service: ZICO_TOKEN_SERVICE,
      });

      runInAction(() => {
        this.token = token;
      });
    } catch (error) {
      console.error('Failed to save Zico token:', error);
    }
  }

  async clearToken() {
    try {
      await Keychain.resetGenericPassword({
        service: ZICO_TOKEN_SERVICE,
      });

      runInAction(() => {
        this.token = '';
      });
    } catch (error) {
      console.error('Failed to clear Zico token:', error);
    }
  }
}

export const zicoStore = new ZicoStore();
