import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { SecureStorage } from 'ionic-native';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {

  url: string;
  secureStorage: SecureStorage;
  email: string;
  password1: string; // TODO: vérifier
  password2: string; // l'égalité en dynamique
  firstName: string; // TODO : désactiver le boutton "register"
  lastName: string;  // tant que tous les champs ne sont pas remplis
  address: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
    this.email = "";
    this.password1 = "";
    this.password2 = "";
    this.firstName = "";
    this.lastName = "";
    this.address = "";
    this.url = 'http://localhost:3000/users';
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
