import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { InvoiceModule } from '../invoice/invoice.module';
import { InvoiceListService } from '../invoice/invoice-list/invoice-list.service';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { NewShopSidebarComponent } from './shop-list/new-shop-sidebar/new-shop-sidebar.component';
import { ShopListService } from './shop-list/shop-list.service';
import { ShopViewService } from './shop-view/shop-view.service';
import { ShopEditService } from './shop-edit/shop-edit.service';



// routing
const routes: Routes = [
  {
    path: '',
    component: ShopListComponent,
    resolve: {
      uls: ShopListService
    },
    data: { animation: 'ShopListComponent' }
  },
  {
    path: 'shop-view/:id',
    component: ShopViewComponent,
    resolve: {
      data: ShopViewService,
      // InvoiceListService
    },
    data: { path: 'view/:id', animation: 'ShopViewComponent' }
  },
  {
    path: 'shop-edit/:id',
    component: ShopEditComponent,
    resolve: {
      ues: ShopEditService
    },
    data: { animation: 'ShopEditComponent' }
  },
  {
    path: 'user-view',
    redirectTo: '/apps/user/user-view/2' // Redirection
  },
  {
    path: 'user-edit',
    redirectTo: '/apps/user/user-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [ShopListComponent, ShopViewComponent, ShopEditComponent, NewShopSidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    InvoiceModule,
    CoreSidebarModule
  ],
  providers: [ShopListService, ShopViewService, ShopEditService]
})
export class ShopModule {}
