import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-grid',
  imports: [],
  template: `
    <p>
      products-grid works!
    </p>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>("all");

  products = signal<Product[]>([
    {
      "id": "1",
      "name": "Wireless Noise-Cancelling Headphones",
      "description": "Premium wireless headphones with active noise cancellation and long battery life",
      "price": 299.99,
      "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "rating": 4.5,
      "reviewCount": 128,
      "inStock": true,
      "category": "electronics"
    },
    {
      "id": "2",
      "name": "Smart 4K TV",
      "description": "65-inch OLED Smart TV with HDR and built-in streaming apps",
      "price": 1299.99,
      "imageUrl": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
      "rating": 4.7,
      "reviewCount": 94,
      "inStock": true,
      "category": "electronics"
    },
    {
      "id": "3",
      "name": "Professional Camera",
      "description": "Mirrorless digital camera with 4K video capabilities",
      "price": 899.99,
      "imageUrl": "https://images.unsplash.com/photo-1519183071298-a2962eadcdb2",
      "rating": 4.6,
      "reviewCount": 76,
      "inStock": true,
      "category": "electronics"
    },
    {
      "id": "4",
      "name": "Classic Denim Jacket",
      "description": "Vintage-style denim jacket with modern fit",
      "price": 79.99,
      "imageUrl": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      "rating": 4.4,
      "reviewCount": 54,
      "inStock": true,
      "category": "clothing"
    },
    {
      "id": "5",
      "name": "Cotton T-Shirt Pack",
      "description": "Set of 3 premium cotton t-shirts in essential colors",
      "price": 34.99,
      "imageUrl": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "rating": 4.3,
      "reviewCount": 61,
      "inStock": true,
      "category": "clothing"
    },
    {
      "id": "6",
      "name": "Wool Winter Coat",
      "description": "Elegant wool-blend coat perfect for cold weather",
      "price": 199.99,
      "imageUrl": "https://images.unsplash.com/photo-1542060748-10c28b62716f",
      "rating": 4.6,
      "reviewCount": 42,
      "inStock": true,
      "category": "clothing"
    },
    {
      "id": "7",
      "name": "Leather Watch",
      "description": "Classic analog watch with genuine leather strap",
      "price": 149.99,
      "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "rating": 4.5,
      "reviewCount": 39,
      "inStock": true,
      "category": "accessories"
    },
    {
      "id": "8",
      "name": "Designer Sunglasses",
      "description": "UV-protected polarized sunglasses with premium frame",
      "price": 129.99,
      "imageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      "rating": 4.4,
      "reviewCount": 48,
      "inStock": true,
      "category": "accessories"
    },
    {
      "id": "9",
      "name": "Leather Wallet",
      "description": "Handcrafted leather wallet with RFID protection",
      "price": 49.99,
      "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      "rating": 4.5,
      "reviewCount": 67,
      "inStock": true,
      "category": "accessories"
    },
    {
      "id": "10",
      "name": "Smart Coffee Maker",
      "description": "WiFi-enabled coffee maker with programmable brewing",
      "price": 199.99,
      "imageUrl": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
      "rating": 4.2,
      "reviewCount": 31,
      "inStock": true,
      "category": "home"
    },
    {
      "id": "11",
      "name": "Air Purifier",
      "description": "HEPA air purifier with air quality monitoring",
      "price": 249.99,
      "imageUrl": "https://images.unsplash.com/photo-1586201375761-83865001e31b",
      "rating": 4.6,
      "reviewCount": 58,
      "inStock": true,
      "category": "home"
    },
    {
      "id": "12",
      "name": "Robot Vacuum",
      "description": "Smart robot vacuum with mapping and scheduling",
      "price": 399.99,
      "imageUrl": "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "rating": 4.3,
      "reviewCount": 44,
      "inStock": false,
      "category": "home"
    },
    {
      "id": "13",
      "name": "Gaming Mouse",
      "description": "High precision gaming mouse with RGB lighting",
      "price": 59.99,
      "imageUrl": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
      "rating": 4.5,
      "reviewCount": 82,
      "inStock": true,
      "category": "electronics"
    },
    {
      "id": "14",
      "name": "Mechanical Keyboard",
      "description": "Mechanical keyboard with blue switches",
      "price": 109.99,
      "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "rating": 4.6,
      "reviewCount": 73,
      "inStock": true,
      "category": "electronics"
    },
    {
      "id": "15",
      "name": "Bluetooth Speaker",
      "description": "Portable Bluetooth speaker with deep bass",
      "price": 79.99,
      "imageUrl": "https://images.unsplash.com/photo-1585386959984-a41552231693",
      "rating": 4.5,
      "reviewCount": 69,
      "inStock": true,
      "category": "electronics"
    },
    {
      "id": "16",
      "name": "Desk Lamp",
      "description": "LED desk lamp with adjustable brightness",
      "price": 39.99,
      "imageUrl": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      "rating": 4.2,
      "reviewCount": 29,
      "inStock": true,
      "category": "home"
    },
    {
      "id": "17",
      "name": "Backpack",
      "description": "Water-resistant backpack with laptop compartment",
      "price": 69.99,
      "imageUrl": "https://images.unsplash.com/photo-1514474959185-147d5d7e0d1a",
      "rating": 4.4,
      "reviewCount": 46,
      "inStock": true,
      "category": "accessories"
    },
    {
      "id": "18",
      "name": "Running Shoes",
      "description": "Lightweight running shoes with breathable mesh",
      "price": 89.99,
      "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "rating": 4.4,
      "reviewCount": 64,
      "inStock": true,
      "category": "clothing"
    },
    {
      "id": "19",
      "name": "Yoga Mat",
      "description": "Non-slip yoga mat with extra cushioning",
      "price": 29.99,
      "imageUrl": "https://images.unsplash.com/photo-1601925260368-ae2f83cfb79f",
      "rating": 4.3,
      "reviewCount": 51,
      "inStock": true,
      "category": "home"
    },
    {
      "id": "20",
      "name": "Portable Power Bank",
      "description": "10000mAh fast charging power bank",
      "price": 49.99,
      "imageUrl": "https://images.unsplash.com/photo-1609592405006-0d5c0b0c2b34",
      "rating": 4.5,
      "reviewCount": 91,
      "inStock": true,
      "category": "electronics"
    }


  ]);

  filteredProducts = computed(() => this.products().filter(p => p.category === this.category().toLocaleLowerCase()));

}
