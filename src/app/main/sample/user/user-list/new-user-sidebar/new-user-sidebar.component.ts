import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { User } from 'app/models';
import { AuthenticationService } from 'app/service';
import { ApiService } from 'app/service/api.service';
import { Role } from 'app/types';

@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit {
  authUser: User
  public avatar = 'https://firebasestorage.googleapis.com/v0/b/sonik-shop.appspot.com/o/df-user.jpg?alt=media&token=1ddbf787-f3bf-45ef-b4d3-2436fcfe8a6'
  public name
  public email = ''
  public phoneNumber
  public role
  public shopId = ''

  shops = [];
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private api: ApiService,
    private auth: AuthenticationService
    ) {
      this.authUser = auth.currentUserValue
      api.getAll('shops').subscribe(
        data => this.shops = data
      )
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      if (this.role === Role.ADMIN) this.api.post('admin', { avatar: this.avatar, name: this.name, email: this.email, phoneNumber: this.phoneNumber })
      else this.api.post('employee', { avatar: this.avatar, name: this.name, phoneNumber: this.phoneNumber, role: this.role,shopId: this.shopId})
      this.toggleSidebar('new-user-sidebar');
    }
  }

  ngOnInit(): void {}
}
