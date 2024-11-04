import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { User } from '../../models/user.mode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Load user data from local storage on initialization, if in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserDataFromStorage();
    }
  }

  private loadUserDataFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        this.userData = JSON.parse(storedData);
      }
    }
  }

  setUserData(data: User): void {
    this.userData = data;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userData', JSON.stringify(data)); // Store in local storage
    }
  }

  getUserData(): User | null {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userData'); // Clear from storage
    }
  }
}
