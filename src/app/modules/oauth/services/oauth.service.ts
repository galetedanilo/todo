import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, tap } from 'rxjs';
import { ILoginRequest } from '../requests';
import { ILoginResponse } from '../responses';
import { CApiResources } from '../consts';
import { StorageService } from '../../../core/services';
import { Router } from '@angular/router';

@Injectable()
export class OauthService {
  #router = inject(Router);
  #http = inject(HttpClient);
  #storageService = inject(StorageService);

  login(params: ILoginRequest): Observable<ILoginResponse> {
    return this.#http
      .post<ILoginResponse>(CApiResources.AuthEndpoint.login, params)
      .pipe(
        first(),
        tap((data) => {
          this.#storageService.setToken(data.token);
          this.#router.navigate(['todo']);
        })
      );
  }
}
