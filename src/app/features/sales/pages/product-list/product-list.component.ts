import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { GetResponseProducts } from '../../services';
import { ProductService } from '../../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId = 1;
  previousCategoryId = 1;
  // new properties for pagination
  thePageNumber = 1;
  thePageSize = 10;
  theTotalElements = 0;
  previousKeyWord = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.paramMap.pipe(
      tap(() => this.getProductList())
    ).subscribe();
  }

  getProductList = () => {
    if (this.router.snapshot.paramMap.has('keyword')) {
      this.handleSearchProducts();
    } else {
      this.handleListProduct();
    }
  }

  handleListProduct = () => {
        // Check if "id" parameter is available
    if (this.router.snapshot.paramMap.has('id')) {
      // get the "id" param string. convert string to a number using the "+" symbol
      const id = this.router.snapshot.paramMap.get('id');
      this.currentCategoryId =  id == null ? Number(id) : 1;
    } else {
      this.currentCategoryId = 1;
    }

    // check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    // if we have a different category id than previous
    // then set the Page number back to one
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategory=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).pipe(
      tap(this.processResult())
    ).subscribe();
  }

  handleSearchProducts = () => {
    const keyword: string = this.router.snapshot.paramMap.get('keyword') ?? '';

    // if we have a different keyword than previous
    // then set the pageNumber to 1
    if (this.previousKeyWord !== keyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyWord = keyword;

    console.log(`keyword=${keyword}, thePageNumber=${this.thePageNumber}`);
    // now search for the products using keyword
    this.productService.searchProductPaginate(this.thePageNumber - 1, this.thePageSize, keyword).pipe(
      tap(this.processResult())
    ).subscribe();
  }


  updatePageSize = (pageSize: number) => {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getProductList();
  }

  private processResult = () => {
    return (data: GetResponseProducts) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart = (product: Product) => {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
    this.cartService.addToCart(new CartItem(product));
  }
}
