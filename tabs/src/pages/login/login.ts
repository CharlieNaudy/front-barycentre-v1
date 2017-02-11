import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  constructor(public navCtrl: NavController) {}

  login() {
    this.navCtrl.setRoot(TabsPage);
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
