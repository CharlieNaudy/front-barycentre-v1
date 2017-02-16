import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';
import { MeetingsPage } from '../pages/meetings/meetings';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

import { HttpModule, JsonpModule } from '@angular/http'; // tuto angular

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    FriendsPage,
    LoginPage,
    MeetingsPage,
    RegisterPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    FriendsPage,
    LoginPage,
    MeetingsPage,
    RegisterPage,
    SettingsPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}
