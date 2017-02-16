import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FriendsPage } from '../friends/friends';
import { MeetingsPage } from '../meetings/meetings';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root: any = MeetingsPage;
  tab2Root: any = FriendsPage;
  tab3Root: any = SettingsPage;

  constructor(public navCtrl: NavController) { }
}
