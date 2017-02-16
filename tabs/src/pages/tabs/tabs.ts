import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FriendsPage } from '../friends/friends';
import { LoginPage } from '../login/login';
import { MeetingsPage } from '../meetings/meetings';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page

  tab1Root: any = MeetingsPage;
  tab2Root: any = FriendsPage;
  tab3Root: any = SettingsPage;

  constructor(public navCtrl: NavController) { }
}
