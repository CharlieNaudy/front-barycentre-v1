// TODO : implement native storage
// --> uncomment lines in the constructor
// --> uncomment line in login() method
// TODO : replace angular Http methods by Ionic v2 HTTP methods
// TODO : use loaders to handle too long http requests

import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage } from 'ionic-native';

// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
import { HTTP } from 'ionic-native';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  url: string;
  secureStorage: SecureStorage;
  email: string;
  password: string;

  constructor(public alertCtrl: AlertController, /*public http: Http,*/ public navCtrl: NavController, ) {

    this.url = 'http://api-barycentre.herokuapp.com/users/login';

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

  ionViewDidLoad() {
    if (window.localStorage['userId'] && window.localStorage['token']) {
      this.navCtrl.push(TabsPage, {}, { animate: false });
    }
  }

  // login() {
  //   this.http.post(this.url, {
  //     email: this.email,
  //     password: this.password
  //   }).map((res: Response) => res.json()).subscribe(messageJson => {
  //     if (messageJson.error) {
  //       let alert = this.alertCtrl.create({
  //         title: 'Error',
  //         subTitle: messageJson.error,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     } else if (messageJson.token && messageJson.userId) {
  //       window.localStorage['userId'] = messageJson.userId;
  //       window.localStorage['token'] = messageJson.token;
  //       // this.createStorage();
  //       this.navCtrl.push(TabsPage, {}, { animate: false });
  //     } else {
  //       let alert = this.alertCtrl.create({
  //         title: 'Error',
  //         subTitle: 'Something went wrong.',
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }
  //   });
  // }

  login() {
    HTTP.post(this.url, {
      email: this.email,
      password: this.password
    }, {})
      .then(data => {
        let headers = data.headers;
        let body = JSON.parse(data.data);
        let status = data.status;
        if (body.error) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: body.error,
            buttons: ['OK']
          });
          alert.present();
        } else if (body.token && body.userId) {
          window.localStorage['userId'] = body.userId;
          window.localStorage['token'] = body.token;
          // this.createStorage();
          this.navCtrl.push(TabsPage, {}, { animate: false });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Something went wrong.',
            buttons: ['OK']
          });
          alert.present();
        }
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Something went wrong.',
          buttons: ['OK']
        });
        alert.present();
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }
}
