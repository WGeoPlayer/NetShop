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

  closedetailsofc(){
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
}
