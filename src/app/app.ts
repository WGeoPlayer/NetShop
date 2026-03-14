import { Footer } from './footer/footer';
import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./navigation/navigation";
import { Login } from "./login/login";
import { Signup } from './signup/signup';
import { Service } from './service';
import { Details } from './details/details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Login, Signup, Details, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('final-project');
  constructor(public service: Service) { 
    effect(() => {
    this.updateScrollLock2(this.service.showDetails());
  });
  }

  isLoginShown: boolean = false;
  isSignupShown: boolean = false;
  handleLoginToggle(show: boolean) {
    this.isLoginShown = show;
    this.updateScrollLock(show);
    if (show) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
  }

  handleSignupToggle(show: boolean) {
    this.isSignupShown = show;
    this.updateScrollLock(show);
  }

  private updateScrollLock(lock: boolean) {
    if (lock) {
      document.body.classList.add('no-scroll');
      window.scrollTo(0, 0)
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  private updateScrollLock2(lock: boolean) {
    if (lock) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

}
