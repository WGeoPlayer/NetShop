import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(public http: HttpClient, public cookies: CookieService) { }

  showDetails = signal<boolean>(false);
  activeId = signal<string>('');

  getAllProducts() {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38`)
  }

  signUp(item: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", item)
  }

  logIn(item: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", item)
  }

  getUserData() {
    const token = this.cookies.get('user');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://api.everrest.educata.dev/auth', { headers });
  }

  fewProducts(){
    return this.http.get("https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=12")
  }

  getProductById(id:string){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${id}`)
  }


}

