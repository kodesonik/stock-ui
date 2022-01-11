import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { User } from 'app/models';
import { AuthenticationService } from 'app/service';
import { ApiService } from 'app/service/api.service';
import { Role } from 'app/types';

@Component({
  selector: 'app-new-shop-sidebar',
  templateUrl: './new-shop-sidebar.component.html'
})
export class NewShopSidebarComponent implements OnInit {
  authUser: User

  public ownerId
  public shopName
  public shopAddress
  public accountExpiredAt = ""
  public geolocation = { longitude: "", latitude: ""}
// owner
  public avatar = "https://firebasestorage.googleapis.com/v0/b/sonik-shop.appspot.com/o/df-user.jpg?alt=media&token=1ddbf787-f3bf-45ef-b4d3-2436fcfe8a6"
  public name = ''
  public email = ''
  public phoneNumber = ''

  // owners = [];
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private api: ApiService, private auth: AuthenticationService) {
        this.authUser = auth.currentUserValue
        if (this.authUser.role === Role.OWNER) this.ownerId = this.authUser.id
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
      this.api.post('shop', {
        owner: { id:  this.ownerId, avatar: this.avatar, name: this.name, email: this.email, phoneNumber: this.phoneNumber},
        shop: { name: this.shopName, address: this.shopAddress, accountExpiredAt: this.accountExpiredAt, geolocation: this.geolocation }
      })
      this.toggleSidebar('new-user-sidebar');
    }
  }

  ngOnInit(): void {}
}
