import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as Config from '../../config';

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
  private iab: InAppBrowser) {
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

}
