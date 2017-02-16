import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FriendsPage } from '../friends/friends';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page

  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = FriendsPage;

  constructor(public navCtrl: NavController) { }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}
