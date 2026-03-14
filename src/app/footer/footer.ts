import { Component } from '@angular/core';
import { Router,} from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  constructor(public router:Router){}

  gotoshop(){
    this.router.navigate(["/shopAll"])
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  gotoprofile(){
    this.router.navigate(["/profile"])
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  gotostart(){
    this.router.navigate(["/"])
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
