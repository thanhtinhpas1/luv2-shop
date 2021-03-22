import { Country } from '../models/country';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { State } from '../models/state';

export interface PaginatedResponse {
    page: {
        size: number,
        totalElements: number;
        totalPages: number,
        number: number;
    };
}

export interface GetResponseProductCategory extends PaginatedResponse {
    _embedded: {
        productCategory: ProductCategory[];
    };
}

export interface GetResponseProducts extends PaginatedResponse {
    _embedded: {
        products: Product[];
    };
}


export interface GetResponseStates {
    _embedded: {
        states: State[],
    };
}

export interface GetResponseCountries {
    _embedded: {
        countries: Country[],
    };
}

export * from './product.service';

