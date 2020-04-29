import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';

  includeDetail: boolean = true;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;


  // Using Setter and Getter

  // // create a private property
  // private _listFilter: string;

  // // create a Getter propery
  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // // create a Setter property
  // set listFilter(valueToSet: string) {
  //   this._listFilter = valueToSet;
  //   this.performFilter(this.listFilter);
  // }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService) { }


    get showImage(): boolean {
      return this.productParameterService.showImage;
    }

    set showImage(value: boolean) {
      this.productParameterService.showImage = value;
    }


  ngAfterViewInit(): void {
    if (this.filterComponent.listFilter) {
      this.parentListFilter = this.filterComponent.listFilter;
      console.log(this.parentListFilter);
    }
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
         this.filterComponent.listFilter =  this.productParameterService.filterBy;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }


  onValueChange(value: string) {
    this.productParameterService.filterBy = value;
    this.performFilter(this.productParameterService.filterBy);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }

  }
}
