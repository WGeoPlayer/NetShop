import { Component, effect, EventEmitter, Input, Output, signal, } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  @Input() id = '';

  public product = signal<any>({})

  constructor(private service: Service) {
    effect(() => {
      let currentId = this.service.activeId();
      if (currentId) {
        this.service.getProductById(currentId).subscribe((data: any) => {
          this.product.set(data);
        });
      }
    });
  }



  @Output() closedetails: EventEmitter<boolean> = new EventEmitter()

  closePopupArea(e: any) {
    if (e.target.className == "popup") {
      this.closedetails.emit(false)
    }

  }

  closedetailsofc() {
    this.closedetails.emit(false)
  }

  selectedImageIndex = signal<number>(0);

  nextImage() {
    let total = this.product().images.length || 0;
    this.selectedImageIndex.update(i => (i + 1) % total);
  }

  prevImage() {
    let total = this.product()?.images.length || 0;
    this.selectedImageIndex.update(i => (i - 1 + total) % total);
  }

  isLoggedIn(): boolean {
    return this.service.cookies.get('user') !== '';
  }

  addToCart() {
    let token = this.service.cookies.get('user');

    if (!token) {
      alert('Please log in to add items to your cart!');
      return;
    }

    this.service.getUserData().subscribe((user: any) => {
      if (!user.verified) {
        alert('Please verify your account first!');
        return;
      }

      let productId = this.product()._id;

      this.service.getCart().subscribe({
        next: (cart: any) => {
          let existingItem = cart.products?.find((p: any) => p.productId === productId);
          let newQuantity = existingItem ? existingItem.quantity + 1 : 1;

          this.service.updateCartItem(productId, newQuantity).subscribe({
            next: () => alert('item added in the cart!'),
            error: (err) => console.error('Patch failed:', err)
          });
        },
        error: (err) => {
          if (err.error?.error?.includes('already created')) {
            this.service.updateCartItem(productId, 1).subscribe(() => alert('Added to cart!'));
          } else {
            this.service.postToCart(productId, 1).subscribe(() => alert('Cart created and item added!'));
          }
        }
      });
    });
  }
}
