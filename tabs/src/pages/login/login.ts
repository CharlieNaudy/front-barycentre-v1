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
  logData = {
    "email": "",
    "password": ""
  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) { }

  login() {
    this.http.post('https://myApi/api/v1/authenticate', { email: this.email, password: this.password }, function(messageJson) {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({ title: 'Erreur', subTitle: messageJson.error, buttons: ['OK'] });
        alert.present();
      }
      else if (messageJson.token) {
        window.localStorage['login'] = this.email;
        window.localStorage['authToken'] = messageJson.token;
        let alert = this.alertCtrl.create({ title: 'Succès', subTitle: 'Connexion réussie', buttons: ['OK'] });
        alert.present();
        this.navCtrl.setRoot(TabsPage);
      }
    })

  }

  getRegister() {
    this.navCtrl.push(RegisterPage);
  }
}

/*
      .then(function(response) {
      window.localStorage['authToken'] = response.data.token;
    }, function(error) {
      alert('Incorrect password - please try again.')
      console.log(error);
    });

    let alert = this.alertCtrl.create({
      title: 'It works bitch!',
      subTitle: 'email: ' + this.logData.email + '  password: ' + this.logData.password,
      buttons: ['OK']
    });
    alert.present();
    */
