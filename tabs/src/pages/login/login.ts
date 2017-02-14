import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

// https://scotch.io/tutorials/angular-2-http-requests-with-observables
// https://www.metaltoad.com/blog/angular-2-using-http-service-write-data-api
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

@Injectable()
export class LoginPage {

  email: string;
  password: string;
  url: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
    this.url = 'http://localhost:3000/users/login';
  }

  postLogin() {
    return this.http.post(this.url, {
      email: this.email,
      password: this.password
    }).map((res:Response) => res.json());
  }

  login() {
    //this.postLogin()
    return this.http.post(this.url, {
      email: this.email,
      password: this.password
    }).map((res:Response) => res.json()).subscribe(messageJson => {
      console.log(messageJson);
      if (messageJson.error) {
        let alert = this.alertCtrl.create({ title: 'Error', subTitle: messageJson.error, buttons: ['OK'] });
        alert.present();
      } else if (messageJson.token) {
        window.localStorage['login'] = this.email;
        window.localStorage['token'] = messageJson.token;
        console.log(window.localStorage);
        let alert = this.alertCtrl.create({ title: 'Login', subTitle: 'Welcome to Barycentre !', buttons: ['OK'] });
        alert.present();
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  getRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
