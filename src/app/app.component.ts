import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactlistPage } from '../pages/contactlist/contactlist';
import { AppMinimize } from '@ionic-native/app-minimize';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import * as Config from '../config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: any = [];
  admobid:any;
  constructor
    (public platform: Platform,
      public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private appMinimize: AppMinimize,
    private iab: InAppBrowser,
    public app: App,
  private authentication: AuthenticationProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   this.pages = [
    { title: 'Home', pageName:HomePage, icon: 'home' },
    { title: 'Submit News', pageName: 'SubmitNews', icon:"md-attach" },
    { title: 'Important Contacts', pageName: 'ContactlistPage', icon: 'contacts' },
    { title: 'Todays Event', pageName: 'LinkPage', icon: 'md-globe' },
    { title: 'All in one shopping', pageName: 'ShoppingPage', icon: 'md-globe' },
    {title:'Contact Us', pageName:ListPage, icon:'md-globe'},
    { title: 'Login', pageName: 'LoginPage' , icon:'md-contact' },
  ];
    // platform.registerBackButtonAction(() => {
    //   // this.backgroundMode.enable();
    //   this.appMinimize.minimize();
    // }, 1);
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
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      // let nav = this.app.getActiveNavs()[0];
      // let activeView = nav.getActive();
      // Checks if can go back before show up the alert
      // if (.name === 'HomePage') {
      //   if (nav.canGoBack()) {
      //     nav.pop();
      //   }
      //   else {
          this.appMinimize.minimize();
      //   }
      // }
    });
    
  }

    openPage(page: any) {
    if (page.pageName == "SubmitNews") {
      this.iab.create('http://palianews.com/submit-news', '_self' , Config.options
                                                                    );
    }
    else {
      this.nav.setRoot(page.pageName);
    }
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
