import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})

export class FriendsPage {

  url: string;
  userId: string;

  data: any;
  friends: any;
  ids: any;
  names: any;

  constructor(public alertCtrl: AlertController, public app: App, public http: Http, public navCtrl: NavController) {

    this.userId = window.localStorage['userId'];
    this.url = 'http://api-barycentre.herokuapp.com/friends/';

    this.friends = [];
    this.ids = [];
    this.names = [];

    this.myfriends();
    // this.http.get(this.url).subscribe(friends => this.data);
    // parsed = JSON.parse(this.data);
    // for (var x in parsed){
    // 	this.friends.push(parsed[x])
    // }

  }

  myfriends() {
    this.http.get(this.url + 'users/' + this.userId).map((res: Response) => res.json()).subscribe(messageJson => {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: messageJson.error,
          buttons: ['OK']
        });
        alert.present();
      } else if (messageJson.friends) {
        this.names = [];
        this.ids = [];
        for (var i in messageJson.friends) {
          this.names.push(messageJson.friends[i].name);
          this.ids.push(messageJson.friends[i].id);
        }
      }
    });
  }

  delete(name) {
    this.http.delete(this.url + this.ids[this.names.indexOf(name)]).map((res: Response) => res.json()).subscribe(messageJson => {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: messageJson.error,
          buttons: ['OK']
        });
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

            } else if (0 /* All fields have not been completed*/) {

            } else {
              this.http.post(this.url, {
                name: data.name,
                address: data.address,
                user_id: this.userId
              }).map((res: Response) => res.json()).subscribe(messageJson => {
                if (messageJson.error) {
                  let alert2 = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: messageJson.error,
                    buttons: ['OK']
                  });
                  alert2.present();
                } else {
                  let alert3 = this.alertCtrl.create({
                    title: 'You have a new friend!',
                    subTitle: data.name + ' is now your friend.',
                    buttons: ['OK']
                  });
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
