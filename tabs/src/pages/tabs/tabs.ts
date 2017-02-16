import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { MeetingsPage } from '../meetings/meetings';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page

<<<<<<< HEAD
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = FriendsPage;
=======
  tab1Root: any = MeetingsPage;
  tab2Root: any = ContactPage;
  tab3Root: any = SettingsPage;
>>>>>>> 3aa3722db36c73a3d63a62a8cc07b4924abad0af

  constructor(public navCtrl: NavController) { }
}
