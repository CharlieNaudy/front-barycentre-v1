import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';


import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {

  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password1: string;
  password2: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {
    this.password1 = "";
    this.password2 = "";
  }

  register() {

    if (this.password1 === "" && this.password2 === "") {
      let alert = this.alertCtrl.create({ title: 'Erreur', subTitle: 'Vous devez choisir un mot de passe', buttons: ['OK'] });
      alert.present();
    } else if (this.password1 === this.password2) {
      console.log('Entered the loop !');
      this.http.post('http://localhost:3000/users', {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        email: this.email,
        password: this.password1
      }, function(messageJson) {
        if (messageJson.error) {
          let alert = this.alertCtrl.create({ title: 'Erreur', subTitle: messageJson.error, buttons: ['OK'] });
          alert.present();
        } else if (messageJson.token) {
          window.localStorage['login'] = this.email;
          window.localStorage['authToken'] = messageJson.token;
          let alert = this.alertCtrl.create({ title: 'Succès', subTitle: 'Connexion réussie', buttons: ['OK'] });
          alert.present();
          this.navCtrl.setRoot(TabsPage);
        }
      })
    } else {
      let alert = this.alertCtrl.create({ title: 'Erreur', subTitle: 'Entrez deux fois le même mot de passe', buttons: ['OK'] });
      alert.present();
    }
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegisterPage');
  // }
}
