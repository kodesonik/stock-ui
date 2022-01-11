import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Shop } from 'app/models';
import { ApiService } from 'app/service/api.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ShopEditService implements Resolve<any> {
  id: string
  public apiData: any
  public onDataChanged: BehaviorSubject<Shop>

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private api: ApiService) {
    // Set the defaults
    this.onDataChanged = new BehaviorSubject(null);
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get API Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api.getAll('shops' ).subscribe((response: any) => {
        this.apiData = response;
        this.onDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  editShop(id: string, data: Shop) {
    this.api.edit('shops', id, data)
  }
}
