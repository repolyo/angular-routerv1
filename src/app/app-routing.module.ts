import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ComposeMessageComponent} from './compose-message/compose-message.component';
import {AuthGuard} from './auth/auth.guard';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';

const routes: Routes = [
  {path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
  {path: 'admin', canLoad: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),},
  { path: 'crisis-center', loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
    data: { preload: true }},
  {path: '', redirectTo: '/superheroes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: true,
      preloadingStrategy: SelectivePreloadingStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
