import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        children: [
          {
            path: '',
            loadChildren: '../tab-home/tab-home.module#TabHomePageModule'

          },
        ]
      },
      {
        path: 'tab-novoChamado',
        children: [
          {
            path: '',
            loadChildren: '../tab-novoChamado/tab-novoChamado.module#TabNovoChamadoModule'
          }
        ]
      },
      {
        path: 'tab-configuracao',
        children: [
          {
            path: '',
            loadChildren: '../tab-configuracao/tab-configuracao.module#TabConfiguracaoPageModule'
          }
        ]
      },
      {
        path: 'tab-info',
        children: [
          {
            path: '',
            loadChildren: '../tab-info/tab-info.module#TabInfoPageModule'
          }
        ]
      },
      {
        path: 'tab-detalhe',
        children: [
          {
            path: '',
            loadChildren: '../tab-home/tab-detalhe/tab-detalhe.module#TabDetalhePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
