// TODO : implement native storage
// --> uncomment lines in the constructor
// --> uncomment line in register() method
// TODO : replace angular Http methods by Ionic v2 HTTP methods
// TODO : check passwords equality dynamically
// TODO : deactivate "register" button while all fields are not completed

import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage } from 'ionic-native';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {

  url: string;
  secureStorage: SecureStorage;
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName: string;
  address: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {

    this.url = 'http://localhost:3000/users';

    this.address = "";
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.password1 = "";
    this.password2 = "";
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

  register() {
    if ((this.password1 === "" && this.password2 === "") || this.email === "" || this.firstName === "" || this.lastName === "" || this.address === "") {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'All fields are mandatory',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.password1 === this.password2) {
      this.http.post(this.url, {
        email: this.email,
        password: this.password1,
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address
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
            title: 'Register',
            subTitle: 'Welcome to Barycentre !',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(TabsPage, {}, {
            animate: false
          });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Something went wrong.',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Both passwords must be the same !',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
