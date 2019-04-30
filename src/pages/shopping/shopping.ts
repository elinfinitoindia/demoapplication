import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as Config from '../../config';

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  data: any;

  constructor
    (public navCtrl: NavController,
    public navParams: NavParams,
    private wordpress: WordpressProvider,
    private iab:InAppBrowser) {
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

}
