import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})

export class MeetingsPage {

  url: string;

  ids: any;
  names: any;


  constructor(public alertCtrl: AlertController, public http: Http, public navCtrl: NavController) {

    this.url = window.localStorage['url'] + 'meetings/user/' + window.localStorage['userId'] + '/';

    this.ids = [];
    this.names = [];

    this.myMeetings();
  }

  myMeetings() {
    this.http.get(this.url).map((res: Response) => res.json()).subscribe(messageJson => {
      if (messageJson.error) {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: messageJson.error,
          buttons: ['OK']
        });
        alert.present();
      } else if (messageJson.meetings) {
        this.names = [];
        this.ids = [];
        for (var i in messageJson.meetings) {
          this.names.push(messageJson.meetings[i].name);
          this.ids.push(messageJson.meetings[i].id);
        }
      }
    });
  }
}
