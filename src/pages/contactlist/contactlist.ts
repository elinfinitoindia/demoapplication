import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Http , Headers } from '@angular/http';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { Clipboard } from '@ionic-native/clipboard';
import { AdMobPro } from '@ionic-native/admob-pro';
import * as Config from '../../config';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-contactlist',
  templateUrl: 'contactlist.html',
})
export class ContactlistPage {

    public data:any;
  
  
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private wordpress: WordpressProvider,
    private clipboard: Clipboard,
    private admob: AdMobPro,
    private ga: GoogleAnalytics,
    private platform:Platform
  ) {
  
  }
  
  ionViewWillEnter() {
    if (this.admob) this.admob.createBanner({
      adId: Config.adMobIdBanner,
      position: this.admob.AD_POSITION.BOTTOM_CENTER,
      adSize: "SMART_BANNER",
      autoShow: true
    });

    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.setRoot('HomePage');
      backAction();
    }, 2);
    
  }

  ionViewDidLoad() {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    console.log('ionViewDidLoad ContactlistPage');
    this.wordpress.getContacts().subscribe(res=>{
      this.data = res;
    },err=>{
        this.wordpress.createToast('Unable to load contacts');
    })
  }

  numberCopy(data) {
  
    this.ga.trackEvent('ShareApp', 'Tapped Action', 'Contact is shared ' + 0);
    this.clipboard.clear();
    this.clipboard.copy(data.Number);
    this.wordpress.createToast('Phone number has been copied');
  }

  ionViewWillLeave() {
    this.admob.removeBanner();
    
  }
  }

