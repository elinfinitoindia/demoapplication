import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, IonicPage } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Http, Headers } from '@angular/http';
import * as Config from '../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PostpagePage } from '../postpage/postpage'
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobPro } from '@ionic-native/admob-pro';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { App } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage{
  posts: Array<any> = new Array<any>();
  images: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  adddata: any;
  isdata: any;
  isConnected: boolean;
  isOnline: boolean;
  applink: any;
  postCounter =0;

  constructor(
    public navCtrl: NavController, private iab: InAppBrowser, private http: Http,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpress: WordpressProvider,
    private socialSharing: SocialSharing,
    private admob: AdMobPro,
    private network: Network,
    private platform: Platform,
    private appMinimize: AppMinimize,
    public app: App,
    private ga: GoogleAnalytics,
    private oneSignal
      : OneSignal

  ) {
   

    this.ga.startTrackerWithId('UA-112909536-4')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Home Page');
        // Tracker is ready
        // You can now track pages or set additional information such as AppVersion or UserId
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
    

  }
  
  ionViewWillEnter() {
  this.wordpress.mySubject.subscribe(res => {
    this.isConnected = res;
    console.log(res);
  });
  
    
    this.network.onConnect().subscribe(data => {
      console.log(data)
      if (this.isOnline == false) {
        this.getPosts();
      }
      this.wordpress.createToast('You are online');
    }, error => console.error(error));
    
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.isOnline = false;
    
      this.wordpress.createToast('You are offline');
      
    }, error => console.error(error));
  
      if (this.admob) this.admob.createBanner({
        adId: Config.adMobIdBanner,
        position: this.admob.AD_POSITION.BOTTOM_CENTER,
        adSize: "SMART_BANNER",
        autoShow: true
      });
      if (!(this.posts.length > 0)) {
       
        this.getPosts();
      
      }
      // get ads for slider 
      this.wordpress.getAdsData().subscribe(res => {
        this.adddata = res;
        console.log(this.adddata)
        if (this.adddata.length > 0) {
          this.isdata = true;
        }
        else {
          this.isdata = false;
        }
      }, err => {
        this.wordpress.createToast('Unable to load news');
      });
    
  }
  getPosts() {
       let loading = this.loadingCtrl.create();
       loading.present();
       
          this.wordpress.getRecentPosts(1,7)
          .subscribe(data => {
            for (let post of data) {
              post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
              this.posts.push(post);
            }
            loading.dismiss();
          }, err => {
            this.wordpress.createToast('Error in loading news. Trying again');
              loading.dismiss();
              this.postCounter++
              if(this.postCounter <2)
              this.getPosts();
          });
      }

  doRefresh(refresher) {

    this.wordpress.getRecentPosts(1,7)
      .subscribe(data => {
        for (let post of data) {
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
          
        }
      }, err => {
        this.wordpress.createToast('Unable to load news');
        });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length / 10)) + 1;
    let loading = true;
    this.wordpress.getRecentPosts(page, 7)
      .subscribe(data => {
        for (let post of data) {
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
      }, err => {
        this.wordpress.createToast('Unable to load news');
    
      });
  }

  postTapped(event, post) {
    console.log(post);
    this.navCtrl.push('PostpagePage', {
      id: post.id
    });
  }

  shareApplication() {
    

    var message = `*` + Config.message + `*` + `\n`;
    this.socialSharing.share(message, null, null, Config.appLink).then(() => {
      this.ga.trackEvent('ShareApp', 'Tapped Action', 'Item Tapped is', 0);
    }).catch(() => {
      console.log('error in sharing');
    });
  
  }

  ionViewWillLeave() {
    this.admob.removeBanner();
    this.postCounter = 0;
  } 
}
