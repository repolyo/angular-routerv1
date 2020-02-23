import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CrisisCenterRoutingModule} from './crisis-center-routing.module';
import {CrisisListComponent} from './crisis-list/crisis-list.component';
import {FormsModule} from '@angular/forms';
import {CrisisDetailComponent} from './crisis-detail/crisis-detail.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';

@NgModule({
  declarations: [
    CrisisDetailComponent,
    CrisisListComponent,
    CrisisCenterComponent,
    CrisisCenterHomeComponent],
  imports: [
    CommonModule,
    CrisisCenterRoutingModule,
    FormsModule
  ]
})
export class CrisisCenterModule {
}
