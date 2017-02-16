// TODO : check how the Auth class works in Ionic v2
// --> put the comment in the constructor

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage: any;

  constructor(platform: Platform) { // public auth:Auth

    platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();

      this.rootPage = LoginPage;
    });
  }
}
