export const WORDPRESS_URL = 'http://palianews.com/';
export const WORDPRESS_REST_API_URL = WORDPRESS_URL + 'wp-json/wp/v2/';
export const adMobIdBanner = 'ca-app-pub-1026612479166196/1340662056';
export const adMobIdInterstitial = 'ca-app-pub-1026612479166196/1777089409';
export const appLink = "https://play.google.com/store/apps/details?id=io.palianews.app&hl=en";
export const message = `Now get instant news update on a click.Download the palianews app from playstore or below link`


import { InAppBrowserOptions } from '@ionic-native/in-app-browser';

export const options: InAppBrowserOptions = {
  location: 'no',//Or 'no' 
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
