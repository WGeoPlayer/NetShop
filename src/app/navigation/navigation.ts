import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Service } from '../service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation implements OnInit {
  constructor(public service: Service, private cookies: CookieService, public router: Router) { }

  @Output() openLogin = new EventEmitter<boolean>()
  isLoggedIn = signal<boolean>(false)
  userName = signal<string>('')
  userAvatar = signal<string>('')

  ngOnInit() {
    this.updateAuthStatus()
  }

  updateAuthStatus() {
    let hasToken = this.cookies.check('user')
    this.isLoggedIn.set(hasToken)

    if (hasToken) {
      this.service.getUserData().subscribe({
        next: (user: any) => {
          this.userName.set(user.firstName)
          this.userAvatar.set(user.avatar)

        },
        error: (err: any) => {
          console.error("Session expired", err)
        }
      })
    }
  }

  handleProfileClick() {
    if (this.isLoggedIn()) {
      this.service.getUserData().subscribe({
        next: (user: any) => {
          if (user.verified) {
            this.router.navigate(['/profile'])
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });

          } else {
            alert("Please verify your email first!")
          }
        },
        error: (err) => {
          console.error("Could not fetch user data", err)
          this.openLogin.emit(true)
        }
      })
    } else {
      this.openLogin.emit(true)
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  gotoshopall() {
    this.router.navigate(["/shopAll"])
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}