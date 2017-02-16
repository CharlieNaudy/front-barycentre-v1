import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})

export class MeetingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
}
