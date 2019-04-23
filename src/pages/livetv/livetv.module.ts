import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivetvPage } from './livetv';

@NgModule({
  declarations: [
    LivetvPage,
  ],
  imports: [
    IonicPageModule.forChild(LivetvPage),
  ],
})
export class LivetvPageModule {}
