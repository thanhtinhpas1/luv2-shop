import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Country } from '../../models/country';
import { State } from '../../models/state';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Luv2Validators } from '../../utils/luv2-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice = 0;
  totalQuantity = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService,
  ) { }

  get firstName(): any {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(): any {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email(): any {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet(): any {
    return this.checkoutFormGroup.get('shippingAdress.street');
  }

  get shippingAddressCity(): any {
    return this.checkoutFormGroup.get('shippingAdress.city');
  }

  get shippingAddressState(): any {
    return this.checkoutFormGroup.get('shippingAdress.state');
  }

  get shippingAddressZipCode(): any {
    return this.checkoutFormGroup.get('shippingAdress.zipCode');
  }

  get shippingAddressCountry(): any {
    return this.checkoutFormGroup.get('shippingAdress.country');
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2Validators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2Validators.notOnlyWhiteSpace]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Luv2Validators.notOnlyWhiteSpace
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cartType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });

    const startMonth = new Date().getMonth() + 1;
    this.luv2ShopFormService.getCreditCardMonths(startMonth).pipe(
      tap(data => this.creditCardMonths = data)
    ).subscribe();

    this.luv2ShopFormService.getCreditCardYears().pipe(
      tap(data => this.creditCardYears = data)
    ).subscribe();

    this.luv2ShopFormService.getCountries().pipe(
      tap(data => this.countries = data)
    ).subscribe();
  }

  onSubmit = () => {
    console.log(this.checkoutFormGroup.get('customer')?.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  copyShippingToBillingAddress = ($event: any) => {
    if ($event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears = () => {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with current month
    let startMonth;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.luv2ShopFormService.getCreditCardMonths(startMonth).pipe(
      tap(data => this.creditCardMonths = data)
    ).subscribe();
  }

  getStates = (formGroupName: string) => {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.luv2ShopFormService.getStates(countryCode).pipe(
      tap(data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      })
    ).subscribe();
  }
}
