import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AdMobPro } from '@ionic-native/admob-pro';
import * as Config from '../../config'
@IonicPage(
  {
    defaultHistory: ['LoginPage',]

  }


)
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  register_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public wordpressService: WordpressProvider,
    public authenticationService: AuthenticationProvider,
    private platform: Platform,
    private admob:AdMobPro
  ) {
   
  }


  ionViewWillEnter() {
    let backAction =this.platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
    
  }

  ionViewWillLoad() {
    if (this.admob) this.admob.createBanner({
      adId: Config.adMobIdBanner,
      position: this.admob.AD_POSITION.BOTTOM_CENTER,
      adSize: "SMART_BANNER",
      autoShow: true
    });

    
    this.register_form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit(values) {
    var username = 'Admin'; // this should be an administrator Username
    var password = 'Elinfinito@22'; // this should be an administrator Password
    //only authenticated administrators can create users
    this.authenticationService.doLogin(username, password)
      .subscribe(
        res => {
          let user_data = {
            username: values.username,
            name: values.displayName,
            email: values.email,
            password: values.password
          };
          this.authenticationService.doRegister(user_data, res.json().token)
            .subscribe(
              result => {
                console.log(result);
                this.wordpressService.createToast('Registration Successful');
                this.navCtrl.setRoot('HomePage');
              },
              error => {
                this.wordpressService.createToast('Error in registering user');
              }
            );
        },
        err => {
          console.log(err);
        }
      )
  
  }
    ionViewWillLeave() {
    this.admob.removeBanner();
  }
}
