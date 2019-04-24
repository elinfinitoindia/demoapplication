import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as Config from '../../config';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class WordpressProvider {

  public mySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
                

  constructor(
    public http: Http,
    private toastController: ToastController,
    private network:Network
  )
  {
    console.log('Hello WordpressProvider Provider');
  }

  getRecentPosts(page: number , categoryId:number) {
    let header: Headers = new Headers();
    header.append('Access-Control-Allow-Origin', '*');
     let category_url = categoryId? ("&categories=" + categoryId): "";
    //if we want to query posts by category
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?page=' + page +category_url
      )
      .map(res => res.json());
  }
  getComments(postId: number, page: number = 1) {
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + "comments?post=" + postId
      + '&page=' + page)
      .map(res => res.json());
  }
  createComment(postId, user, comment) {
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + user.token);

    return this.http.post(Config.WORDPRESS_REST_API_URL + "comments?token=" + user.token, {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    }, { headers: header });
  }

  createToast(message: string) {
    const toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getContacts() {
    return this.http.get('https://jsonstorage.net/api/items/15fbb6bf-b929-4010-8e97-028e70916b0f')
      .map((res: any) => res.json());
  }

  getShoppingLinks() {
    return this.http.get('https://jsonstorage.net/api/items/235b8e4f-c995-40be-a868-3b3ae98e81f3')
      .map((res: any) => res.json());
  };

  getAdsData() {
    return this.http.get('https://jsonstorage.net/api/items/9d711024-0f3a-4ed3-83b8-84088b767073')
      .map((res: any) => res.json());
  }

   onConnect() {
    this.network.onConnect().subscribe((data) => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as wel
      setTimeout(() => {
        this.displayNetworkUpdate(data.type);
        this.mySubject.next(true);
      }, 1000);
    });
  }

  onDisconnect() {
    this.network.onDisconnect().subscribe((data) => {
      this.displayNetworkUpdate(data.type);
      this.mySubject.next(false);
      localStorage.setItem("nT", "false");
    });
  }

   displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    this.createToast(`You are now ${connectionState} via ${networkType}`);

   }
  
  getEvents() {
    return this.http.get('')
     .map((res: any) => res.json());
  }

   getRecentEvents(page: number , categoryId:number) {
    let header: Headers = new Headers();
    header.append('Access-Control-Allow-Origin', '*');
     let category_url = categoryId? ("&categories=" + categoryId): "";
    //if we want to query posts by category
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?page=' + page +category_url
      )
      .map(res => res.json());
  }
}


