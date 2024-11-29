import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

import { Product } from '../../models/products/product';
import { Cart } from '../../models/cart/Cart';

import { CartProductsComponent } from "../../components/cart-products/cart-products.component";
import { CartSummaryComponent } from "../../components/cart-summary/cart-summary.component";
import { ShippingFormComponent } from "../../components/shipping-form/shipping-form.component";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    CartProductsComponent,
    CartSummaryComponent,
    ShippingFormComponent,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  cart: Cart = {} as Cart;
  cartItems: { product: Product, quantity: number }[] = [];
  productList: Product[] = [];
  tax: number = 5;
  total: number = this.tax;

  constructor(
    private _formBuilder: FormBuilder,
    private cartService: CartService,
    private productService: ProductsService,
  ) {

    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({});
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.productList = [];
      this.cartItems = [];
      this.total = this.tax;
      this.loadCartProducts();
    });
  }

  loadCartProducts(): void {
    this.cart.products.forEach(item => {
      this.productService.getProductById(item.productId).subscribe(product => {
        this.productList.push(product);
        this.cartItems.push({ product, quantity: item.quantity });

        if (product.discount !== 0) {
          this.total += (product.price * product.discount) * item.quantity;
        } else {
          this.total += product.price * item.quantity;
        }
      });
    });
  }

  handleRemoveProduct(productId: string | number): void {
    this.removeProductFromCart(productId);
  }

  removeProductFromCart(productId: string | number): void {
    this.cartService.deleteProductFromCart(productId).subscribe(() => {
      this.updateCartState(productId);
    });
  }

  updateCartState(productId: string | number): void {
    // Filtra el producto eliminado de las listas
    this.productList = this.productList.filter(product => product.id !== productId);
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);

    // Recalcula el total
    this.total = this.cartItems.reduce((acc, item) => {
      if (item.product.discount !== 0) {
        return acc + (item.product.price * item.product.discount) * item.quantity;
      } else {
        return acc + item.product.price * item.quantity;
      }
    }, 0);
  }
  
  proceedToCheckout(): void {
    // Lógica para proceder al pago
    console.log('Proceder al pago');
  }

  nextStep(stepper: any): void {
    stepper.next();
  }
}