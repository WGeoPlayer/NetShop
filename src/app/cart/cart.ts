import { Component, signal, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Service } from '../service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  public cartData = signal<any>(null);
  public totalPrice = signal<number>(0);
  public fov = signal<string>('50deg');
  constructor(public service: Service) {}

  ngOnInit() {
    this.loadCart();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateFov(event.target.innerWidth);
  }

  updateFov(width: number) {
    if (width <= 655) {
      this.fov.set('10deg');
    } else {
      this.fov.set('50deg');
    }
  }

  loadCart() {
    this.service.getCart().subscribe({
      next: (cart: any) => {
        if (cart.products && cart.products.length > 0) {
          let productRequests = cart.products.map((item: any) =>
            this.service.getProductById(item.productId)
          );

          forkJoin(productRequests).subscribe((productDetails: any) => {
            let detailsArray = productDetails as any[];
            
            let mergedProducts = cart.products.map((item: any, index: number) => ({
              ...item,
              product: detailsArray[index]
            }));

            let total = mergedProducts.reduce((acc: number, item: any) => {
              return acc + (item.pricePerQuantity * item.quantity);
            }, 0);

            cart.products = mergedProducts;
            this.cartData.set(cart);
            this.totalPrice.set(total);
          });
        } else {
          this.cartData.set(cart);
          this.totalPrice.set(0);
        }
      },
      error: (err) => console.error(err)
    });
  }

  updateQty(productId: string, currentQty: number, change: number) {
    let newQty = currentQty + change;
    if (newQty > 0) {
      this.service.updateCartItem(productId, newQty).subscribe(() => this.loadCart());
    }
  }

  removeItem(productId: string) {
    this.service.deleteProductFromCart(productId).subscribe(() => this.loadCart());
    console.log(productId);
    
  }

  @ViewChild('phone') phone!: ElementRef;

  angle = 180;

  ngAfterViewInit() {
    let model = this.phone.nativeElement;

    let animate = () => {
      this.angle += 0.3;
      model.orientation = `90deg ${this.angle}deg 0deg`;
      requestAnimationFrame(animate);
    };

    animate();
  }
}