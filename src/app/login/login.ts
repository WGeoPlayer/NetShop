import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Service } from '../service';
import { Router, } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(public service: Service, public cookies: CookieService, private router: Router) { }

  errorMessage = signal<string>('')

  loginInfo: FormGroup = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.minLength(8)]),
  })

  login() {
    this.service.logIn(this.loginInfo.value).subscribe({
      next: (data: any) => {
        this.cookies.set("user", data.access_token, 7)
        if (data.verified === true) {
          this.cookies.set('isVerified', 'true', 7, '/');
        } else {
          this.cookies.delete('isVerified', '/');
        }
        alert("successfull login")
        this.trailer.emit(false)
        localStorage.setItem('user_name', data.firstName)
        localStorage.setItem('user_avatar', data.avatar)
        window.location.reload()
      },
      error: (err: any) => {
        console.log("Login Error:", err);

        if (err.status === 401) {
          this.errorMessage.set("Invalid email or password.");
        } else if (err.status === 404) {
          this.errorMessage.set("Account not found. Did you register?");
        } else {
          this.errorMessage.set(err.error?.error || "Login failed. Try again.");
        }
      }
    })
  }

  gotosignup() {
    this.trailer.emit(false)
    this.opensign.emit(true)
  }
  @Output() opensign: EventEmitter<boolean> = new EventEmitter()
  @Output() trailer: EventEmitter<boolean> = new EventEmitter()

  closePopupArea(e: any) {
    if (e.target.className == "popup") {
      this.trailer.emit(false)
    }

  }

  close() {
    this.trailer.emit(false)
  }
}
