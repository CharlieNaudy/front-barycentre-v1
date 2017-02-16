// Notice I'm not importing NavController
// Instead I'm importing App, which gives me access to
// app-level properties, such as the root NavController
import { App } from 'ionic-angular';
import { Component } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';


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
