import { Injectable } from '@angular/core';
import { APP_STORAGE_ENUMS } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  clearStorage() {
    localStorage.clear();
  }

  getToken(): string {
    return localStorage.getItem(APP_STORAGE_ENUMS.TOKEN) || '';
  }

  setToken(token: string) {
    localStorage.setItem(APP_STORAGE_ENUMS.TOKEN, token);
  }

  removeToken() {
    localStorage.removeItem(APP_STORAGE_ENUMS.TOKEN);
  }

  getUsername(): string {
    return localStorage.getItem(APP_STORAGE_ENUMS.USERNAME) || '';
  }

  setUsername(username: string) {
    localStorage.setItem(APP_STORAGE_ENUMS.TOKEN, username);
  }

  removeUsername() {
    localStorage.removeItem(APP_STORAGE_ENUMS.USERNAME);
  }
}
