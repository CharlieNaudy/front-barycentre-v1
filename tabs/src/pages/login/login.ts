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
  email = null;
  password=null;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  login() {
    //this.navCtrl.setRoot(TabsPage);
    let alert = this.alertCtrl.create({
      title: 'It works bitch!',
      subTitle: 'email: '+this.email+'  password: '+this.password,
      buttons: ['OK']
    });
    alert.present();

  }
  to_register() {
    this.navCtrl.push(RegisterPage);
  }
}

/*
angular.module(‘myApp.controllers’)
.controller(‘LandingController’, function($http, $scope, $log) {
  this.authenticate = function(email, password) {
    $http.post('https://myApi/api/v1/authenticate', {
      email: email,
      password: password
    }).then(function(response) {
      window.localStorage['authToken'] = response.data.token;
    }, function(error) {
      alert('Incorrect password - please try again.')
      $log.log(error);
    });
  }
});
*/
