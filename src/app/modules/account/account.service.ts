import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map} from "rxjs";
import {User} from "../shared/models/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: any) {
    return this.http.post<User>(this.baseUrl + "user/login", loginData).pipe(
      map(user => {
        localStorage.setItem('userAuthToken', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('userAuthToken');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
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
}
