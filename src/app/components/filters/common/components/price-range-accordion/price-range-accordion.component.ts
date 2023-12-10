import {Component, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {accordionAnimation} from "../../animations/accordion.animations";
import {accordionPriceRangeAnimation} from "./common/animations/accordion-price-range.animations";
import {FiltersComponent} from "../../../filters.component";
import {FiltersService} from "../../../filters.service";
import {CatalogComponent} from "../../../../catalog/catalog.component";

@Directive({
  selector: '[appPositiveNumber]'
})

export class PositiveNumberDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9.]*/g, '');
    const dotCount = (this.el.nativeElement.value.match(/\./g) || []).length;
    if (dotCount > 1) {
      this.el.nativeElement.value = initialValue;
    }
    if (parseFloat(this.el.nativeElement.value) < 0) {
      this.el.nativeElement.value = initialValue;
    }
  }
}

@Component({
  selector: 'app-price-range-accordion',
  templateUrl: './price-range-accordion.component.html',
  animations: [accordionAnimation, accordionPriceRangeAnimation]
})

export class PriceRangeAccordionComponent {
  @Input() maxValue!: number;
  @Input() minValue!: number;
  @Input() isOpen: boolean = true;

  buttonDisabled = false;
  showAlert: boolean = false;
  dataIsValid: boolean = true;

  lowerPriceValid: boolean = true;
  upperPriceValid: boolean = true;
  priceErrorHint: string = '';

  constructor(public filterService: FiltersService, public filterComponent : FiltersComponent,
              public catalogComponent : CatalogComponent) {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  executePriceRangeApply(): void {
    const lowerPriceLimitInput = document.getElementById(
      'lowerpricelimit') as HTMLInputElement;
    const upperPriceLimitInput = document.getElementById(
      'upperpricelimit') as HTMLInputElement;

    let lowerValue = parseFloat(lowerPriceLimitInput.value);
    let upperValue = parseFloat(upperPriceLimitInput.value);

    this.showAlert = false;
    this.lowerPriceValid = true;
    this.upperPriceValid = true;
    this.priceErrorHint = '';

    this.checkPriceRangeValidity(lowerValue, upperValue);

    if (!this.dataIsValid) {
      this.dataIsValid = true;
      return;
    }

    this.addPriceRangeToSelectedFilters(lowerValue, upperValue);

    this.catalogComponent.currentPageIndex = 1;
    window.scrollTo(0, 0);

    this.filterComponent.updateFilters();
    this.catalogComponent.updateCatalog();
  }

  checkPriceRangeValidity(lowerValue: number, upperValue: number): void {
    console.log(lowerValue + '-' + upperValue)
    if (
      lowerValue < this.minValue ||
      lowerValue > upperValue ||
      lowerValue > this.maxValue ||
      isNaN(lowerValue) ||
      lowerValue === undefined
    ) {
      this.showAlert = true;
      this.lowerPriceValid = false;
      this.buttonDisabled = true;
      this.dataIsValid = false;
    }

    if (
      upperValue > this.maxValue ||
      upperValue < this.minValue ||
      isNaN(upperValue) ||
      upperValue === undefined
    ) {
      this.showAlert = true;
      this.upperPriceValid = false;
      this.buttonDisabled = true;
      this.dataIsValid = false;
    }

    if (
      upperValue === lowerValue ||
      (isNaN(lowerValue) && isNaN(upperValue) && lowerValue === undefined && upperValue === undefined)
    ) {
      this.showAlert = true;
      this.lowerPriceValid = false;
      this.upperPriceValid = false;
      this.buttonDisabled = true;
      this.dataIsValid = false;
    }

    if (this.showAlert) {
      if (!this.lowerPriceValid && !this.upperPriceValid) {
        this.priceErrorHint = 'You have entered invalid upper and lower price limits!';
      } else if (!this.lowerPriceValid) {
        this.priceErrorHint = 'You have entered an invalid lower price limit!';
      } else if (!this.upperPriceValid) {
        this.priceErrorHint = 'You have entered an invalid upper price limit!';
      }
    }

    setTimeout(() => {
      this.showAlert = false;
      this.buttonDisabled = false;
    }, 6400);
  }

  addPriceRangeToSelectedFilters(lowerValue: number, upperValue: number) {
    const templateValue: string = 'lowerpricelimit=/&upperpricelimit=*';

    let value: string = templateValue.replace(
      '/', lowerValue.toString()).replace('*', upperValue.toString());

    const existingIndex = this.filterService.selectedFilters.findIndex(
      filter => filter.includes('lowerpricelimit=') && filter.includes('upperpricelimit='));

    if (existingIndex !== -1) {
      this.filterService.selectedFilters[existingIndex] = value;
    } else {
      this.filterService.selectedFilters.push(value);
    }
  }

    protected readonly Object = Object;
}
