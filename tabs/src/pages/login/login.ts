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

  email: any;
  password: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) { }

  login() {
    console.log("prout");
    this.http.post('http://localhost:3000/users/login', { email: this.email, password: this.password }, function(messageJson) {
      if (messageJson.error) {
        console.log("prout2");
        let alert = this.alertCtrl.create({ title: 'Erreur', subTitle: messageJson.error, buttons: ['OK'] });
        alert.present();
      }
      else if (messageJson.token) {
        console.log("prout3");
        window.localStorage['login'] = this.email;
        window.localStorage['authToken'] = messageJson.token;
        let alert = this.alertCtrl.create({ title: 'Succès', subTitle: 'Connexion réussie', buttons: ['OK'] });
        alert.present();
        this.navCtrl.setRoot(TabsPage);
      }
      else console.log("prout4");
    })
  }

  getRegister() {
    this.navCtrl.push(RegisterPage);
  }
}

// .then(function(response) {
//   window.localStorage['authToken'] = response.data.token;
// }, function(error) {
//   alert('Incorrect password - please try again.')
//   console.log(error);
// });
//
// let alert = this.alertCtrl.create({
//   title: 'It works bitch!',
//   subTitle: 'email: ' + this.logData.email + '  password: ' + this.logData.password,
//   buttons: ['OK']
// });
// alert.present();
