import {Inject, Injectable} from '@angular/core';
import {StorageService} from 'ngx-webstorage-service';
import {STORAGE_SERVICE} from './core.module';

export const DARK_THEME_KEY = 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  constructor(@Inject(STORAGE_SERVICE) private storage: StorageService) {
    if (this.storage.get(DARK_THEME_KEY) === undefined) {
      this.storage.set(DARK_THEME_KEY, false);
    }
  }

  toggleTheme(): void {
    this.storage.set(DARK_THEME_KEY, !this.storage.get(DARK_THEME_KEY));
  }

  getTheme(): boolean {
    return this.storage.get(DARK_THEME_KEY);
  }
}
