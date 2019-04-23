import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

/**
 * Generated class for the ShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams , private wordpress:WordpressProvider) {
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

}
