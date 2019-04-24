export const WORDPRESS_URL = 'http://palianews.com/';
export const WORDPRESS_REST_API_URL = WORDPRESS_URL + 'wp-json/wp/v2/';
export const adMobIdBanner = 'ca-app-pub-3940256099942544/6300978111';
export const adMobIdInterstitial = 'ca-app-pub-3940256099942544/1033173712';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';

export const options: InAppBrowserOptions = {
  location: 'yes',//Or 'no' 
  hidden: 'no', //Or  'yes'
  clearcache: 'yes',
  clearsessioncache: 'yes',
  zoom: 'yes',//Android only ,shows browser zoom controls 
  hardwareback: 'yes',
  mediaPlaybackRequiresUserAction: 'no',
  shouldPauseOnSuspend: 'no', //Android only 
  closebuttoncaption: 'Close', //iOS only
  disallowoverscroll: 'no', //iOS only 
  toolbar: 'yes', //iOS only 
  enableViewportScale: 'no', //iOS only 
  allowInlineMediaPlayback: 'no',//iOS only 
  presentationstyle: 'pagesheet',//iOS only 
  fullscreen: 'yes',//Windows only    
};
