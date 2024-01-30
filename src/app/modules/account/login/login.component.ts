import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {BasketService} from "../../../components/features/basket/basket.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$')]),
    password: new FormControl('', Validators.required)
  })

  responseMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private accountService: AccountService, private router: Router,
              private basketService: BasketService) {
    this.accountService.currentUserSource$.subscribe(
      {
        next: user => {
          if (user !== null) {
            this.router.navigateByUrl('/');
          }
        }
      });
  }

  onSubmit() {
    this.accountService.checkLoginCredentials(this.loginForm.value)
        .subscribe({
            next: response => {
              if (response.responseCode !== 200) {
                this.responseMessage.next(response.responseMessage);
                return;
              }

              this.responseMessage.next(null);

              this.accountService.login(this.loginForm.value)
                  .subscribe({
                        next: user => {
                          this.synchronizeUserBasket();
                          this.basketService.getBasket(localStorage.getItem('basketId')!);
                          this.router.navigateByUrl('/');
                        }
                  });
            }
          });
  }

  private synchronizeUserBasket() {
    this.accountService.currentUserSource$.subscribe({
      next: user => {
        if (user) {
          if (user.basketId !== null) {
            localStorage.setItem('basketId', user.basketId)
          }
          else if (localStorage.getItem('basketId') !== null && user.basketId == null) {
            this.basketService.synchronizeBasketWithUser().subscribe();
          }
        }
      }
    });
  }
}
