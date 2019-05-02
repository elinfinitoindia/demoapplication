import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as Config from '../../config';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  data: any;
  applink
    : any;
  constructor
    (public navCtrl: NavController,
    public navParams: NavParams,
    private wordpress: WordpressProvider,
    private iab: InAppBrowser,
  private socialSharing:SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
    this.wordpress.getShoppingLinks().subscribe(res=>{
      this.data = res;
    },
      err => {
        this.wordpress.createToast('Unable to load stores');
    })
  }

  getStore(data) {
    this.iab.create(data.link , '_self' , Config.options )
  }

  shareApplication() {
    
    let message = `*Now get all the news and shopping apps at one place download the palia news app from playstore now.*`
    
    this.socialSharing.share(message, null, null, Config.appLink).then(() => {
     
    }).catch(() => {
      console.log('error in sharing');
    });
  
  }

}
