import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AdMobPro } from '@ionic-native/admob-pro';
import * as Config from '../../config';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login_form: FormGroup;
  error_message: string;
  islogin: boolean;
  user: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public wordpressService: WordpressProvider,
    public authenticationService: AuthenticationProvider,
    private admob:AdMobPro
  ) {


  }
 

  ionViewWillLoad() {
    this.login_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  
  }

  ionViewWillEnter() {
    this.authenticationService.getUser()
      .then(res => {
        this.islogin = true;
        this.user = res.displayname;
        console.log(this.user);
      }, err => {
        this.islogin = false;
        });
    if (this.admob) this.admob.createBanner({
      adId: Config.adMobIdBanner,
      position: this.admob.AD_POSITION.BOTTOM_CENTER,
      adSize: "SMART_BANNER",
      autoShow: true
    });
    
  }

  login(value) {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.authenticationService.doLogin(value.username, value.password)
      .subscribe(res => {
        this.authenticationService.setUser({
          token: res.json().token,
          username: value.username,
          displayname: res.json().user_display_name,
          email: res.json().user_email
        });

        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
        err => {
          loading.dismiss();
          this.error_message = "Invalid credentials. Try with username 'aa' password 'aa'.";
          console.log(err);
        })
  }

  skipLogin() {
    this.navCtrl.setRoot(HomePage);
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }

  logOut() {
    this.authenticationService.logOut();
    this.navCtrl.setRoot(HomePage);
  }

  ionViewWillLeave() {
    this.admob.removeBanner();
    
  }


}
