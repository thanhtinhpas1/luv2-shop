import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductCategory } from '../../models/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories = () => {
    this.productService.getProductCategories().pipe(
      tap(data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      })
    ).subscribe();
  }

}
