import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.post('http://localhost:8080/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let jwtDecoder: any = jwtDecode(this.accessToken);
    this.username = jwtDecoder.sub;
    this.roles = jwtDecoder.scope;

    if (isPlatformBrowser(this.platformId)) {
      // Vérifie si on est côté client avant d'utiliser localStorage
      window.localStorage.setItem('jwt-token', this.accessToken);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;

    if (isPlatformBrowser(this.platformId)) {
      // Vérifie si on est côté client avant d'utiliser localStorage
      window.localStorage.removeItem('jwt-token');
    }

    this.router.navigateByUrl('/login');
  }

  loadJwtTokenFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      // Vérifie si on est côté client avant d'utiliser localStorage
      let token = window.localStorage.getItem('jwt-token');
      if (token) {
        this.loadProfile({ 'access-token': token });
        this.router.navigateByUrl('/admin/customers');
      }
    }
  }
}
