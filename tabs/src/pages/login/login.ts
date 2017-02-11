import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {}

  login() {
    this.navCtrl.push(TabsPage);
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
