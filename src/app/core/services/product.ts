import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductRequest } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = `${environment.apiUrl}/api/v1/products`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Product[]> { return this.http.get<Product[]>(this.api).pipe(map((products) => products.map((product) => this.normalizeProduct(product)))); }
  getById(id: number): Observable<Product> { return this.http.get<Product>(`${this.api}/${id}`).pipe(map((product) => this.normalizeProduct(product))); }
  getActive(): Observable<Product[]> { return this.http.get<Product[]>(`${this.api}/active`).pipe(map((products) => products.map((product) => this.normalizeProduct(product)))); }
  search(name: string): Observable<Product[]> { return this.http.get<Product[]>(`${this.api}/search?name=${name}`); }
  create(r: ProductRequest): Observable<Product> { return this.http.post<Product>(this.api, r).pipe(map((product) => this.normalizeProduct(product))); }
  update(id: number, r: ProductRequest): Observable<Product> { return this.http.put<Product>(`${this.api}/${id}`, r).pipe(map((product) => this.normalizeProduct(product))); }
  activate(id: number): Observable<Product> { return this.http.put<Product>(`${this.api}/${id}/activate`, {}).pipe(map((product) => this.normalizeProduct(product))); }
  deactivate(id: number): Observable<Product> { return this.http.put<Product>(`${this.api}/${id}/deactivate`, {}).pipe(map((product) => this.normalizeProduct(product))); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }

  private normalizeProduct(product: Product & { active?: boolean }): Product {
    return { ...product, isActive: product.isActive ?? product.active ?? false };
  }
}
