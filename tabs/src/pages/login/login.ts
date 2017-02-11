import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Http } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  email: string;
  password: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  login() {
    //this.navCtrl.setRoot(TabsPage);
    let alert = this.alertCtrl.create({
      title: 'It works bitch!',
      subTitle: 'email: ' + this.email + '  password: ' + this.password,
      buttons: ['OK']
    });
    alert.present();
  }

  to_register() {
    this.navCtrl.push(RegisterPage);
  }
}
