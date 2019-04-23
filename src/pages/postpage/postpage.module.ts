import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostpagePage } from './postpage';

@NgModule({
  declarations: [
    PostpagePage,
  ],
  imports: [
    IonicPageModule.forChild(PostpagePage),
  ],
})
export class PostpagePageModule {}
