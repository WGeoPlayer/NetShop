import { Component, } from '@angular/core';
import { First } from "../first/first";
import { Second } from '../second/second';
import { Third } from '../third/third';
import { Fourth } from "../fourth/fourth";

@Component({
  selector: 'app-home',
  imports: [First, Second, Third, Fourth],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
}
