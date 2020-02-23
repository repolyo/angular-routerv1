import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CrisisListComponent} from './crisis-list/crisis-list.component';
import {CrisisDetailComponent} from './crisis-detail/crisis-detail.component';
import {CrisisCenterHomeComponent} from './crisis-center-home/crisis-center-home.component';
import {CrisisCenterComponent} from './crisis-center/crisis-center.component';
import {CanDeactivateGuard} from '../can-deactivate.guard';
import {CrisisDetailResolverService} from './crisis-detail-resolver.service';

// const heroesRoutes: Routes = [
//   {path: 'crises', component: CrisisListComponent, data: { animation: 'crises' }},
//   {path: 'crisis/:id', component: CrisisDetailComponent, data: { animation: 'crisis' }}
// ];

const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolverService
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrisisCenterRoutingModule {
}
