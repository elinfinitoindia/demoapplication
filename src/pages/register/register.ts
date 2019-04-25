import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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
    private platform: Platform
  ) {
    let backAction = platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    }, 2)
  }

  ionViewWillLoad() {
    this.register_form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit(values) {
    var username: 'Admin'; // this should be an administrator Username
    var password: 'aa'; // this should be an administrator Password
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
              },
              error => {
                console.log(error);
              }
            );
        },
        err => {
          console.log(err);
        }
      )
  }

}
