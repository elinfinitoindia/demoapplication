import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PostpagePage
        
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PostpagePage
    
  
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
    Network
      
  ]
})
export class AppModule {}
