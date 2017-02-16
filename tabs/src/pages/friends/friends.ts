import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController, NavController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})

export class FriendsPage {
  url: string;
  data: any;
  friends: any;
  userId: string;
  names: any;
  ids: any;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, public app: App) {
  		this.userId = window.localStorage['userId'];
  		this.url = 'http://localhost:3000/friends/users/' + this.userId;
  		this.friends = [];
  		this.names = [];
  		this.ids = [];
  		this.myfriends();
    // this.http.get(this.url).subscribe(friends => this.data);
    // parsed = JSON.parse(this.data);
    // for (var x in parsed){
    // 	this.friends.push(parsed[x])
    // }

  }

  myfriends() {
    this.http.get(this.url).map((res: Response) => res.json()).subscribe(messageJson => {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({ title: 'Error', subTitle: messageJson.error, buttons: ['OK'] });
        alert.present();
      }
      else if (messageJson.friends) {
        this.names = [];
        this.ids = [];
        for (var i in messageJson.friends) {
          this.names.push(messageJson.friends[i].name);
          this.ids.push(messageJson.friends[i].id);
        }
        console.log(this.names);
        //this.friends.push();
      }
      //let parsed = JSON.parse(messageJson.friends);
    });
  }

  delete(name) {

    this.http.delete('http://localhost:3000/friends/' + this.ids[this.names.indexOf(name)]).map((res: Response) => res.json()).subscribe(messageJson => {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({ title: 'Error', subTitle: messageJson.error, buttons: ['OK'] });
        alert.present();
      }
      else {
        this.myfriends();
      }
    });

  }

  addFriend() {
    let alert = this.alertCtrl.create({
      title: 'Add Friend',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'address',
          placeholder: 'Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            if (0/* Friend's name already exists */) {

            }
            else if (0 /* All fields have not been completed*/) {

            }
            else {
              this.http.post('http://localhost:3000/friends', { name: data.name, address: data.address, user_id: this.userId }).map((res: Response) => res.json()).subscribe(messageJson => {
                if (messageJson.error) {
                  let alert2 = this.alertCtrl.create({ title: 'Error', subTitle: messageJson.error, buttons: ['OK'] });
                  alert2.present();
                }
                else {
                  let alert3 = this.alertCtrl.create({ title: 'You have a new friend!', subTitle: data.name + 'is now your friend.', buttons: ['OK'] });
                  //alert.delete();
                  alert3.present();
                  this.myfriends();
                }
              });
            }
          }
        }
      ]
    });
    alert.present();
  }
}
