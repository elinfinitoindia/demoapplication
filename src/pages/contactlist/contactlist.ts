import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http , Headers } from '@angular/http';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { Clipboard } from '@ionic-native/clipboard';
import { AdMobPro } from '@ionic-native/admob-pro';
import * as Config from '../../config';


/**
 * Generated class for the ContactlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  private admob:AdMobPro
  ) {
  
  }
  ionViewWillEnter() {
    if (this.admob) this.admob.createBanner({
      adId: Config.adMobIdBanner,
      position: this.admob.AD_POSITION.BOTTOM_CENTER,
      adSize: "SMART_BANNER",
      autoShow: true
    });
    
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
    this.clipboard.clear();
    this.clipboard.copy(data.Number);
    this.wordpress.createToast('Phone number has been copied');
  }

  ionViewWillLeave() {
    // this.admob.removeBanner();
    
  }
  }

