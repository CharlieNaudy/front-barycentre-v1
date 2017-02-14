import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';


import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
	data: any;
	friends: any;
	userId: any;
/*
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.data = null;
  	this.friends = [];
  	this.userId = user.id;
  	this.friends = this.url = 'http://localhost:3000/friends/users/this.userId';
    this.http.get(this.url).subscribe(friends => this.data);
    parsed = JSON.parse(this.data);
    for (var x in parsed){
    	this.friends.push(parsed[x])
    }

  }
*/



  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}

