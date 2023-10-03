import {Component, OnInit} from '@angular/core';
import {NavigationBarService} from "../common/services/navigation-bar.service";
import {sideBarAnimation, sideBarBackgroundAnimation} from "./animations/side-bar.animations";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  animations: [sideBarAnimation, sideBarBackgroundAnimation]
})
export class SideBarComponent implements OnInit {
  isMenuOpen: boolean = false;

  constructor(private menuService: NavigationBarService) {
  }

  ngOnInit(): void {
    this.menuService.isMenuOpen$.subscribe((isOpen) => {
      this.isMenuOpen = isOpen;
    });
  }

  toggleSideBar() {
    this.menuService.toggleMenu();
  }
}
