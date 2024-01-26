import {Component, OnInit} from '@angular/core';
import {GeneralizedProduct} from "./modules/shared/models/generalized-product";
import {BasketService} from "./components/features/basket/basket.service";
import {AccountService} from "./modules/account/account.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BuyIt.UI';
  items: GeneralizedProduct[] = [];

  constructor(private basketService: BasketService, private accountService: AccountService) {}

  ngOnInit() {
    this.tryGetBasket();
    this.tryAuthenticate();
  }

  private tryAuthenticate() {
    this.accountService.getAuthStatus().subscribe(authStatus => {
      if (!authStatus?.containsAccessToken && authStatus?.containsRefreshToken) {
        this.accountService.refreshAccessToken().subscribe(
          () => {
            this.accountService.getAuthStatus().subscribe(
              updatedAuthStatus => {
                if (updatedAuthStatus.containsAccessToken && updatedAuthStatus.containsRefreshToken) {
                  this.accountService.loadCurrentUser().subscribe();
                }
              });
          });
      }
      else if (authStatus.containsAccessToken && authStatus.containsRefreshToken) {
        this.accountService.loadCurrentUser().subscribe();
      }
    });
  }

  private tryGetBasket() {
    const basketId = localStorage.getItem('basketId');

    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }
}

