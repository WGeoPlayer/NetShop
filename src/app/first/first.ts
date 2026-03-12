import { Component,ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.html',
  styleUrl: './first.css',
})
export class First {
  @ViewChild('heroVideo') videoElement!: ElementRef;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;
    video.muted = true;
    video.play();
  }
}
