import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(public http: HttpClient, public cookies: CookieService) { }


  showDetails = signal<boolean>(false);
  activeId = signal<string>('');

  public pageSize = signal<number>(10)

  public selectedCat = signal<string>('all');
  public selectedBrand = signal<string>('');
  public selectedSearch = signal<string>('');

  getProducts(page: number) {
    let size = this.pageSize();

    if (this.selectedCat() !== 'all') {
      return this.http.get(`https://api.everrest.educata.dev/shop/products/category/${this.selectedCat()}?page_index=${page}&page_size=${size}`);
    }

    if (this.selectedBrand() !== '') {
      return this.http.get(`https://api.everrest.educata.dev/shop/products/brand/${this.selectedBrand()}?page_index=${page}&page_size=${size}`);
    }

    if (this.selectedSearch() !== '') {
      return this.http.get(`https://api.everrest.educata.dev/shop/products/search?page_index=${page}&page_size=${size}&keywords=${this.selectedSearch()}`);
    }

    return this.http.get(`https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${size}`);
  }

  setCategory(id: any) {
    this.selectedCat.set(id);
    this.selectedBrand.set('');
    this.selectedSearch.set('');
  }

  setBrand(brand: any) {
    this.selectedBrand.set(brand);
    this.selectedCat.set('all');
    this.selectedSearch.set('');
  }

  setSearchTerm(term: any) {
    this.selectedSearch.set(term);
    this.selectedCat.set('all');
    this.selectedBrand.set('');
  }

  setPageSize(size: number) {
    this.pageSize.set(size)
  }



  signUp(item: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", item)
  }

  logIn(item: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", item)
  }

  getUserData() {
    let token = this.cookies.get('user');

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://api.everrest.educata.dev/auth', { headers });
  }

  fewProducts() {
    return this.http.get("https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=12")
  }

  getProductById(id: string) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${id}`)
  }

  getCategory() {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/categories`)
  }

  brands() {
    return this.http.get("https://api.everrest.educata.dev/shop/products/brands")
  }

  getAuthHeaders() {
    let token = this.cookies.get('user');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCart() {
    let headers = this.getAuthHeaders();
    return this.http.get('https://api.everrest.educata.dev/shop/cart', { headers });
  }

  postToCart(productId: string, quantity: number) {
    let headers = this.getAuthHeaders();
    return this.http.post('https://api.everrest.educata.dev/shop/cart/product',
      { id: productId, quantity },
      { headers }
    );
  }

  updateCartItem(productId: string, quantity: number) {
    let headers = this.getAuthHeaders();
    return this.http.patch('https://api.everrest.educata.dev/shop/cart/product',
      { id: productId, quantity },
      { headers }
    );
  }

  deleteProductFromCart(productId: string) {
  return this.http.delete('https://api.everrest.educata.dev/shop/cart/product', {
    headers: this.getAuthHeaders(),
    body: {
      id: productId
    }
  });
}



}

