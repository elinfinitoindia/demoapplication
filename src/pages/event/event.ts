import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as Config from '../../config';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';
import { AdMobPro } from '@ionic-native/admob-pro';

/**
 * Generated class for the LinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link',
  templateUrl: 'event.html',
})
export class EventPage {

   posts: Array<any> = new Array<any>();
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private wordpress: WordpressProvider,
    private loadingCtrl: LoadingController,
  private iab: InAppBrowser,
    private socialsharing: SocialSharing,
    private http: Http,
    private admob: AdMobPro,
  private platform: Platform) {
  }

  ionViewDidLoad() {
     let loading = this.loadingCtrl.create();
        loading.present();
        this.wordpress.getRecentEvents(1,10)
          .subscribe(data => {
            for (let post of data) {
              post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
              this.posts.push(post);
            }
            loading.dismiss();
          }, err => {
            this.wordpress.createToast('Unable to load news');
            loading.dismiss();
    
          });
      
    console.log('ionViewDidLoad LinkPage');
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

  submitEvent() {
     this.iab.create('http://palianews.com/submit-your-events', '_self' , Config.options);
  }

   shareApplication() {
    var data;
     var message = 'Please check todays events in Palia Kalan' + `\n` + `http://palianews.com/todays-event `
       + `\n` + `\n` + ` Dowload the palia news android app from playstore check the below link`
                                                                                                            
    
  this.socialsharing
    .share(message, null, null, Config.appLink).then(() => {
      
    }).catch(() => {
      // Sharing via email is not possible
    });
  
   
  }

  ionViewWillLeave() {
    this.admob.removeBanner();
  }


}
