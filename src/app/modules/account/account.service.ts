import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../shared/models/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthStatus} from "../shared/models/auth-status";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUserSource$ = this.currentUserSource.asObservable();
  private authStatusSource: BehaviorSubject<AuthStatus | null> = new BehaviorSubject<AuthStatus | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginData: any) {
    return this.http.post<User>(this.baseUrl + "user/login", loginData, { withCredentials: true })
      .pipe(
        map(user => {
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/');
          return;
        })
    );
  }

  logout() {
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    return this.removeAuthCredentials().subscribe();
  }

  register(registrationData: any) {
    return this.http.post<User>(this.baseUrl + "user/register", registrationData);
  }

  verifyEmail(verificationToken: string, email: string) {
    return this.http.put<User>(
      this.baseUrl + "user/verifyemail?verificationtoken=" + verificationToken + "&email=" + email, null);
  }

  isExistingEmail(email: string) {
    return this.http.get<boolean>(this.baseUrl + "user/emailstatus?email=" + email);
  }

  loadCurrentUser() {
    return this.http.get<User>(this.baseUrl + "user/currentuser", { withCredentials: true })
      .pipe(
        map(user =>
          this.currentUserSource.next(user)
        )
      );
  }

  getCurrentUserValue() {
    return this.currentUserSource.value;
  }

  getAuthStatus() {
    return this.http.get<AuthStatus>(this.baseUrl + "user/authstatus", { withCredentials: true });
  }

  refreshAccessToken(): Observable<string> {
    return this.http.put<string>(this.baseUrl + "user/RefreshAccessToken", null,
      { responseType: 'json', withCredentials: true });
  }

  private removeAuthCredentials() {
    return this.http.post<string>(this.baseUrl + "user/logout", null,
      { responseType: 'json', withCredentials: true });
  }
}
