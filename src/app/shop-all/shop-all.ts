import { Component, signal, WritableSignal } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-shop-all',
  imports: [],
  templateUrl: './shop-all.html',
  styleUrl: './shop-all.css',
})
export class ShopAll {
  public products = signal<any[]>([]);
  public category = signal<any[]>([]);
  public brands = signal<any[]>([]);

  public currentPage = signal<number>(1);
  public totalItems = signal<number>(0);
  public isSidebarOpen = signal<boolean>(false);


  constructor(public service: Service) { }


  ngOnInit() {
    this.loadProducts();
    this.getCategory();
    this.getbrands();
  }

  toggleSidebar() {
    if (window.innerWidth <= 655) {
      this.isSidebarOpen.update(val => !val);
    }
  }

  get totalPages(): number {
    let size = this.service.pageSize() || 10;
    let total = Math.ceil(this.totalItems() / size);
    return total > 0 ? total : 1;
  }

  getVisiblePages(): number[] {
    let total = this.totalPages;
    let current = this.currentPage();
    let pages: number[] = [];

    let start = Math.max(1, current - 1);
    let end = Math.min(total, start + 2);

    if (end === total) {
      start = Math.max(1, total - 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToFirst() {
    this.goToPage(1);
  }

  goToLast() {
    this.goToPage(this.totalPages);
  }

  updatePageSize(event: Event) {
    let target = event.target as HTMLSelectElement;
    this.service.setPageSize(Number(target.value));
    this.currentPage.set(1);
    this.loadProducts();
    window.scrollTo(0, 0);
  }

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  loadProducts() {
    this.service.getProducts(this.currentPage()).subscribe((data: any) => {
      this.products.set(data.products);

      this.totalItems.set(data.total || 0);

    });
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.currentPage.set(p);
      this.loadProducts();
      window.scrollTo(0, 0);
    }
  }

  filterCat(id: any) {
    this.service.setCategory(id);
    this.currentPage.set(1);
    this.loadProducts();
  }

  filterBrand(brand: string) {
    this.service.setBrand(brand);
    this.currentPage.set(1);
    this.loadProducts();
  }

  onSearch(event: any) {
    this.service.setSearchTerm(event.target.value);
    this.currentPage.set(1);
    this.loadProducts();
  }

  getCategory() {
    this.service.getCategory().subscribe((data: any) => this.category.set(data));
  }

  getbrands() {
    this.service.brands().subscribe((data: any) => this.brands.set(data));
  }

  open(id: string) {
    this.service.activeId.set(id);
    this.service.showDetails.set(true);
  }
}
