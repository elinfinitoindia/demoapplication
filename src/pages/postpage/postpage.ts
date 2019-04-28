import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Http, Headers } from '@angular/http';
import * as Config from '../../config';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobPro } from '@ionic-native/admob-pro';

@IonicPage({
  segment: 'posts/:id',
  defaultHistory: ['HomePage',]
})
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html',
})
export class PostpagePage {

  post: any;
  user: string;
  title: string;
  data: any;
  comments: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  public postid;

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
    let id = this.navParams.get('id');
    console.log(id);
    this.wordpressService.getPostById(id).subscribe(res => {
      this.post = res[0];
      console.log(this.post);
      this.title = this.post.title.rendered;
    });
    this.wordpressService.getAppLink()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
      })
    
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
    let message;
   
message = this.post.title.rendered + `\n` +
  this.post.link + `\n` + `\n`
  + `*` + this.data.message + `*` + `\n`
  + `\n`;
;
console.log(message)

    this.socialSharing.share(message, null, null, this.data.link).then(() => {
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
