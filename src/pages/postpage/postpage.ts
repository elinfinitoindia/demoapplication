import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Http, Headers } from '@angular/http';
import * as Config from '../../config';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobPro } from '@ionic-native/admob-pro';
/**
 * Generated class for the PostpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html',
})
export class PostpagePage {

  post: any;
  user: string;
  title: string;
  comments: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public wordpressService: WordpressProvider,
    private authenticationService: AuthenticationProvider,
    private http: Http,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private admob: AdMobPro
  ) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2);
  if (admob) admob.createBanner({
    adId: Config.adMobIdBanner,
    position: admob.AD_POSITION.BOTTOM_CENTER,
    adSize: 'MEDIUM_RECTANGLE',
    autoShow: true
  });
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostpagePage');
  }

  ionViewWillEnter() {
    this.morePagesAvailable = true;
    let loading = this.loadingCtrl.create();

    loading.present();

    this.post = this.navParams.get('item');
    this.title = this.navParams.data.item.title.rendered;
    loading.dismiss();
 
  }

  getComments() {
    return this.wordpressService.getComments(this.post.id);
  }

  loadMoreComments(infiniteScroll) {
    let page = (this.comments.length / 10) + 1;
    this.wordpressService.getComments(this.post.id, page)
      .subscribe(data => {
        for (let item of data) {
          this.comments.push(item);
        }
        infiniteScroll.complete();
      }, err => {
        console.log(err);
        this.morePagesAvailable = false;
      })
  }
  createComment() {
    let user: any;

    this.authenticationService.getUser()
      .then(res => {
        user = res;

        let alert = this.alertCtrl.create({
          title: 'Add a comment',
          inputs: [
            {
              name: 'comment',
              placeholder: 'Comment'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Accept',
              handler: data => {
                let loading = this.loadingCtrl.create();
                loading.present();
                this.wordpressService.createComment(this.post.id, user, data.comment)
                  .subscribe(
                    (data) => {
                      console.log("ok", data);
                      this.getComments();
                      loading.dismiss();
                    },
                    (err) => {
                      console.log("err", err);
                      loading.dismiss();
                    }
                  );
              }
            }
          ]
        });
        alert.present();
      },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Please login',
            message: 'You need to login in order to comment',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Login',
                handler: () => {
                  this.navCtrl.push(LoginPage);
                }
              }
            ]
          });
          alert.present();
        });
  }

  shareNews(post) {
    console.log(this.post);
    var message = this.post.title.rendered + `
      Download Palia News android app at http://elinfinitoindia.in;
    `;
    console.log(message)
    this.socialSharing.share(message, null, null, this.post.link).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  ionViewWillLeave
  () { 
    if (this.admob) this.admob.prepareInterstitial({ adId: Config.adMobIdInterstitial, autoShow: true });
  }
  
}
