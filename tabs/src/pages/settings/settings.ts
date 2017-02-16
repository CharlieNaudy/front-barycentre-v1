import { App } from 'ionic-angular';
import { Component } from '@angular/core';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  constructor(private app: App) { }

  logout() {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('token');
    let root = this.app.getRootNav();
    root.popToRoot({animate: false});
  }
}
