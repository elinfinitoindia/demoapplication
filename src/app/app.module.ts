import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WordpressProvider } from '../providers/wordpress/wordpress';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppMinimize } from '@ionic-native/app-minimize';
import { AdMobPro } from '@ionic-native/admob-pro';
import { HttpModule } from '@angular/http';
import { Clipboard } from '@ionic-native/clipboard';
import { PostpagePage } from '../pages/postpage/postpage';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BranchIo } from '@ionic-native/branch-io';
import { Deeplinks } from '@ionic-native/deeplinks';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@NgModule({
  declarations: [
    MyApp,  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, 
    ),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InAppBrowser,
      AuthenticationProvider,
      WordpressProvider,
      NativeStorage,
      SocialSharing,
      AppMinimize,
      AdMobPro,
      Clipboard,
      WordpressProvider,
      AuthenticationProvider,
      Network,
      LocalNotifications,
      BranchIo,
      Deeplinks,
      GoogleAnalytics 
    
    
  ]
})
export class AppModule {}
