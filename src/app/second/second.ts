import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Service } from '../service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './second.html',
  styleUrl: './second.css'
})
export class Second implements OnInit {

  products = signal<any[]>([])

  constructor(private service: Service) { }

  ngOnInit() {
    this.service.fewProducts().subscribe({
      next: (res: any) => {
        this.products.set(res.products)
      },
      error: (err) => console.error("Error fetching products:", err)
    })
  }

  @ViewChild('scrollList') scrollList!: ElementRef

  currentTranslate = 0;

  scrollRight() {
    let element = this.scrollList.nativeElement
    let cardWidth = element.offsetWidth / 5

    let isAtEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 10

    if (!isAtEnd) {
      element.scrollBy({ left: cardWidth, behavior: 'smooth' })
    } else {
      element.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  scrollLeft() {
    let element = this.scrollList.nativeElement
    let cardWidth = element.offsetWidth / 5

    if (element.scrollLeft > 0) {
      element.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  open(id: string) {
    this.service.activeId.set(id);
    this.service.showDetails.set(true);
  }
}