import { Component,ViewChild, ElementRef} from '@angular/core';
import { Router, RouterLink, } from '@angular/router';

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.html',
  styleUrl: './first.css',
})
export class First {

  constructor(public router:Router){}

  @ViewChild('heroVideo') videoElement!: ElementRef;

  ngAfterViewInit() {
    let video = this.videoElement.nativeElement;
    video.muted = true;
    video.play();
  }

  gotoshop(){
    this.router.navigate(["/shopAll"])
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
