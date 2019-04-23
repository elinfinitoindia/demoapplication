import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactlistPage } from '../pages/contactlist/contactlist';
import { AppMinimize } from '@ionic-native/app-minimize';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: any = [];
  constructor
    (public platform: Platform,
      public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private appMinimize: AppMinimize,
  private iab:InAppBrowser) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   this.pages = [
    { title: 'Home', pageName:HomePage, icon: 'home' },
    { title: 'Submit News', pageName: 'SubmitNews', icon:"md-attach" },
    { title: 'Important Contacts', pageName: 'ContactlistPage', icon: 'contacts' },
    { title: 'Login', pageName: 'LoginPage' , icon:'md-contact' },
    { title: 'All in one shopping', pageName: 'ShoppingPage' , icon:'md-globe' },
  ];
    platform.registerBackButtonAction(() => {
      // this.backgroundMode.enable();
      this.appMinimize.minimize();
    }, 1);
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    
      setTimeout(() => {
         this.splashScreen.hide();
      }, 1000);
      
    });
  }

    openPage(page: any) {
 
    if (page.pageName == "SubmitNews") {
      this.iab.create('http://palianews.com/submit-news', '_self');
    }
    else {
      this.nav.setRoot(page.pageName);
    }
    // The active child nav is our Tabs Navigation
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
  
  }


  
  isActive(page: any) {
    // Again the Tabs Navigation

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName
    )
    {
      return 'mycolor';
    }
  }
}
