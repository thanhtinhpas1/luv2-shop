import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartDetailsComponent } from './features/sales/pages/cart-details/cart-details.component';
import { CartItemComponent } from './features/sales/pages/cart-item/cart-item.component';
import { CartStatusComponent } from './features/sales/pages/cart-status/cart-status.component';
import { ProductCategoryMenuComponent } from './features/sales/pages/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './features/sales/pages/product-details/product-details.component';
import { ProductListComponent } from './features/sales/pages/product-list/product-list.component';
import { SearchComponent } from './features/sales/pages/search/search.component';
import { CartService } from './features/sales/pages/services/cart.service';
import { ProductService } from './features/sales/services';
import { CheckoutComponent } from './features/sales/pages/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Luv2ShopFormService } from './features/sales/services/luv2-shop-form.service';

const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent, },
  { path: 'category', component: ProductListComponent, },
  { path: 'cart-details', component: CartDetailsComponent, },
  { path: 'checkout', component: CheckoutComponent, },
  { path: 'products', component: ProductListComponent, },
  { path: 'products/:id', component: ProductDetailsComponent, },
  { path: 'search/:keyword', component: ProductListComponent, },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartItemComponent,
    CartDetailsComponent,
    CheckoutComponent,
  ],
  imports: [
    // angular
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService, CartService, Luv2ShopFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
