import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as Config from '../../config';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Http } from '@angular/http';

/**
 * Generated class for the LinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link',
  templateUrl: 'link.html',
})
export class LinkPage {

   posts: Array<any> = new Array<any>();
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private wordpress: WordpressProvider,
    private loadingCtrl: LoadingController,
  private iab: InAppBrowser,
    private socialsharing: SocialSharing,
  private http: Http) {
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

  submitEvent() {
     this.iab.create('http://palianews.com/submit-your-events', '_self' , Config.options);
  }

   shareApplication() {
    var data;
    var message = 'Palia News now available on playstore, download it for latest news around you.';
    
    this.http.get('https://jsonstorage.net/api/items/f8ffa470-4360-4206-908b-d944b7c690a1')
      .map((res)=>res.json())
      .subscribe(res => {
       data = res;
        this.socialsharing
             .share(message, null, null, data.link).then(() => {
          console.log(data.link);
        }).catch(() => {
          // Sharing via email is not possible
        });
        
    },
      err => {
        console.log('unable to share link')
      }
    )
  
   
  }


}
