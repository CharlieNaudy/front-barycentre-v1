import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})

export class MeetingsPage {

  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.url = window.localStorage['url'] + 'meetings/user/' + window.localStorage['userId'] + '/';
  }
}
