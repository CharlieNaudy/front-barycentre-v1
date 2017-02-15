import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

// https://scotch.io/tutorials/angular-2-http-requests-with-observables
// https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { SecureStorage } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  url: string;
  secureStorage: SecureStorage;
  email: string;
  password: string;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
    this.url = 'http://localhost:3000/users/login';
    // POUR UTILISER LE SECURE STORAGE NATIF
    // this.secureStorage = new SecureStorage();
    // this.secureStorage.create('Secure storage').then(
    //   () => console.log('Storage is ready!'),
    //   error => console.log(error)
    // );
  }

  createStorage() {
    this.secureStorage.create('Secure storage')
      .then(
      () => console.log('Storage is ready!'),
      error => console.log(error)
      );
  }

  getRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.http.post(this.url, {
      email: this.email,
      password: this.password
    }).map((res: Response) => res.json()).subscribe(messageJson => {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: messageJson.error,
          buttons: ['OK']
        });
        alert.present();
      } else if (messageJson.token && messageJson.userId) {
        window.localStorage['userId'] = messageJson.userId;
        window.localStorage['token'] = messageJson.token;
        // this.createStorage();
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: 'Welcome to Barycentre !',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(TabsPage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Something went wrong.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }
}
