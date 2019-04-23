import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http, Headers } from '@angular/http';
import * as Config from '../../config';
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: Http,
    public nativeStorage: NativeStorage) {
    console.log('Hello AuthenticationProvider Provider');
  }
  getUser() {
    return this.nativeStorage.getItem('User');
  }

  setUser(user) {
    return this.nativeStorage.setItem('User', user);
  }

  logOut() {
    return this.nativeStorage.clear();
  }

  doLogin(username, password) {
    return this.http.post(Config.WORDPRESS_URL + 'wp-json/jwt-auth/v1/token', {
      username: username,
      password: password
    })
  }

  doRegister(user_data, token) {
    return this.http.post(Config.WORDPRESS_REST_API_URL + 'users?token=' + token, user_data);
  }

  validateAuthToken(token) {
    let header: Headers = new Headers();
    header.append('Authorization', 'Basic ' + token);
    return this.http.post(Config.WORDPRESS_URL + 'wp-json/jwt-auth/v1/token/validate?token=' + token,
      {}, { headers: header })
  }
}
