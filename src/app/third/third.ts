import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';

@Component({
  selector: 'app-third',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './third.html',
  styleUrl: './third.css',
})
export class Third {
  rotation: number = 0
  leftOpacity: number = 0
  rightOpacity: number = 0

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let element = document.querySelector('.scroll-container')
    if (!element) return

    let rect = element.getBoundingClientRect()
    let viewportHeight = window.innerHeight

    if (rect.top <= 0) {
      let scrollProgress = Math.abs(rect.top) / (rect.height - viewportHeight)
      let progress = Math.min(Math.max(scrollProgress, 0), 1)

      this.rotation = progress * 300;

      this.leftOpacity = Math.min(Math.max((progress - 0.1) * 3, 0), 1)

      this.rightOpacity = Math.min(Math.max((progress - 0.5) * 2, 0), 1)
    }
  }
}
