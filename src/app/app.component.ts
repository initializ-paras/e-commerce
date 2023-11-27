import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeneralizedProduct} from "./modules/shared/models/generalized-product";
import {Pagination} from "./modules/shared/models/pagination";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BuyIt.UI';
  items : GeneralizedProduct[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get<Pagination<GeneralizedProduct[]>>(`https://localhost:7001/api/productsearch?text=a`).subscribe({
    //   next: (response) => this.items = response.items,
    //   error: error => console.log(error),
    //   complete: () => {
    //     console.log("Done!")
    //   }
    // });
  }
}
