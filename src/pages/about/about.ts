import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AdMobPro } from '@ionic-native/admob-pro';
import * as Config from '../../config';

@IonicPage()
  
@Component({
  selector: 'page-list',
  templateUrl: 'about.html'
})
export class AboutPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private admob: AdMobPro,) {
    // If we navigated to this page, we will have an item available as a nav param
   if (this.admob) this.admob.createBanner({
     adId: Config.adMobIdBanner,
     position: this.admob.AD_POSITION.BOTTOM_CENTER,
     adSize: "SMART_BANNER",
     autoShow: true
   });
   
  }

   ionViewWillLeave() {
    this.admob.removeBanner();
  }

 
}
