import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Service } from '../service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(public service: Service, public cookies: CookieService, private router: Router) { }


  registerInfo: FormGroup = new FormGroup({
    "firstName": new FormControl("", [Validators.required,]),
    "lastName": new FormControl("", [Validators.required,]),
    "age": new FormControl("", [Validators.required, Validators.min(18)]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.minLength(8)]),
    "address": new FormControl("", [Validators.required,]),
    "phone": new FormControl("+995", [Validators.required,]),
    "zipcode": new FormControl("", [Validators.required,]),
    "avatar": new FormControl("", [Validators.required,]),
    "gender": new FormControl("", [Validators.required,])
  })

  closePopupArea(e: any) {
    if (e.target.className == "popup") {
      this.opensign.emit(false)
    }

  }
  @Output() opensign: EventEmitter<boolean> = new EventEmitter()
  errorMessage = signal<string>('')
  showerr: boolean = false
  register() {
    this.errorMessage.set('')

    this.service.signUp(this.registerInfo.value).subscribe({
      next: () => {
        alert("Successly created your account! Now please log In.")
        this.router.navigate(["/"])
      },
      error: (err: any) => {
        console.log("Full Error Object:", err);

        const backendErrorString = err.error?.error;

        if (err.status === 409 || backendErrorString?.includes('already in use')) {
          this.errorMessage.set("This email is already registered!")
        } else if (err.status === 400) {
          this.errorMessage.set("Please fill all fields correctly.")
        } else {
          this.errorMessage.set("Something went wrong. Please try again.")
        }
      }
    });
  }
}
