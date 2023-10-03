import { Component } from '@angular/core';
import {NavigationBarService} from "./common/services/navigation-bar.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})

export class NavigationBarComponent{
  constructor(private sharedService: NavigationBarService) {}

  toggleSideBar() {
    this.sharedService.toggleMenu();
  }
}
