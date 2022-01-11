import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'app/service/api.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ShopViewService implements Resolve<any> {
  public rows: any;
  public onDataChanged: BehaviorSubject<any>;
  public id;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private api: ApiService) {
    // Set the defaults
    this.onDataChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let currentId = route.paramMap.get('id');
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData(currentId)]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getApiData(id: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api.getById('shops', id).subscribe((response: any) => {
        this.rows = response;
        this.rows.id = id;
        this.onDataChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
