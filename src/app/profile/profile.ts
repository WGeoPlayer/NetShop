import { Component, OnInit, signal } from '@angular/core';
import { Service } from '../service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user = signal<any>(null);

  constructor(private service: Service, public cookies:CookieService,public router:Router) {}

  ngOnInit() {
    this.service.getUserData().subscribe({
      next: (data) => {
        this.user.set(data);
        console.log(data);
        
      },
      error: (err) => {
        console.error("Failed to load profile", err);
      }
    });
  }
logout() {
  this.cookies.delete('user', '/'); 

  localStorage.clear();

  this.router.navigate(['/']).then(() => {
    window.location.reload();
  });
}
}