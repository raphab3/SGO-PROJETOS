import { TabNovoChamadoPage } from './tab-novoChamado.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: TabNovoChamadoPage }])
  ],
  declarations: [TabNovoChamadoPage],
  providers: [
    Camera
  ],
})
export class TabNovoChamadoModule {}
