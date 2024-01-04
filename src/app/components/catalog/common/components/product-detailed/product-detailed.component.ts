import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../modules/shared/models/product";
import {BreadcrumbService} from "xng-breadcrumb";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {SpecsCategoryVariables} from "../../../../../modules/shared/models/specs-category-variables";
import {SearchService} from "../../../../navigation-bar/search-bar/search.service";

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html'
})

export class ProductDetailedComponent implements OnInit {
  product!: Product;

  constructor(private http : HttpClient, private bcService: BreadcrumbService,
              private searchService: SearchService, private route : ActivatedRoute)
  {
    this.bcService.set('@productItem', { label: '...' });
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    let urlCategory: string;
    let category: string;
    let code: string;

    this.route.params.subscribe((params) => {
      urlCategory = params['category'];
      category = new SpecsCategoryVariables().categoryMapping[params['category']];
      code = params['itemId'];
    });

    this.http.get<Product>(environment.apiUrl + category! + '/item/' + code!).subscribe(
      response =>
      {
        this.product = response;
        this.bcService.set('@productItem', { label: this.product.name });
        this.bcService.set('@productCategory',
          { label: urlCategory.charAt(0).toUpperCase()
              + urlCategory.slice(1).replaceAll('_', ' ') });
        this.searchService.searchedText = '';
      });
  }
}
