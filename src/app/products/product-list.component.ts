import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    // Using Setter and Getter

    // create a private property
    private _listFilter: string;

    // create a Getter propery
    get listFilter(): string {
      return this._listFilter;
    }

    // create a Setter property
    set listFilter(valueToSet: string) {
      this._listFilter = valueToSet;
      this.performFilter(this.listFilter);
    }

    @ViewChild('filterElement', {}) filterElementRef: ElementRef;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) { }

    ngAfterViewInit(): void {
      if (this.filterElementRef.nativeElement) {
        this.filterElementRef.nativeElement.focus();
      }
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
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
