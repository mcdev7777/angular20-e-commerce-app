import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';

const randomFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const userNames = [
  'Rahul',
  'Amit',
  'Neha',
  'Pooja',
  'Vikas',
  'Anjali',
  'Sandeep',
  'Rohit',
  'Kriti',
  'Arjun',
];

const reviewTitles = [
  'Excellent product',
  'Worth the money',
  'Highly recommended',
  'Good quality',
  'Satisfied purchase',
];

const reviewComments = [
  'Product quality is really good.',
  'Value for money, totally satisfied.',
  'Would definitely recommend to others.',
  'Packaging and delivery were good.',
  'Using it daily and performance is great.',
];

const generateReviews = (productId: string, count: number): UserReview[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${productId}-review-${i + 1}`,
    productId,
    userName: randomFrom(userNames),
    userImageUrl: `https://randomuser.me/api/portraits/lego/${i % 10}.jpg`,
    rating: Math.floor(Math.random() * 2) + 4,
    title: randomFrom(reviewTitles),
    comment: randomFrom(reviewComments),
    reviewDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
  }));
};

const rawProducts: Omit<Product, 'reviews'>[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation and long battery life',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    category: 'electronic',
  },
  {
    id: '2',
    name: 'Smart 4K TV',
    description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
    rating: 4.7,
    reviewCount: 94,
    inStock: true,
    category: 'electronic',
  },
  {
    id: '3',
    name: 'Professional Camera',
    description: 'Mirrorless digital camera with 4K video capabilities',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
    rating: 4.6,
    reviewCount: 76,
    inStock: true,
    category: 'electronic',
  },
  {
    id: '4',
    name: 'Classic Denim Jacket',
    description: 'Vintage-style denim jacket with modern fit',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    rating: 4.4,
    reviewCount: 54,
    inStock: false,
    category: 'clothing',
  },
  {
    id: '5',
    name: 'Cotton T-Shirt Pack',
    description: 'Set of 3 premium cotton t-shirts in essential colors',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    rating: 4.3,
    reviewCount: 61,
    inStock: true,
    category: 'clothing',
  },
  {
    id: '6',
    name: 'Wool Winter Coat',
    description: 'Elegant wool-blend coat perfect for cold weather',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1542060748-10c28b62716f',
    rating: 4.6,
    reviewCount: 42,
    inStock: true,
    category: 'clothing',
  },
  {
    id: '7',
    name: 'Leather Watch',
    description: 'Classic analog watch with genuine leather strap',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    rating: 4.5,
    reviewCount: 39,
    inStock: true,
    category: 'accessories',
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    description: 'UV-protected polarized sunglasses with premium frame',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    rating: 4.4,
    reviewCount: 48,
    inStock: true,
    category: 'accessories',
  },
  {
    id: '9',
    name: 'Leather Wallet',
    description: 'Handcrafted leather wallet with RFID protection',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    category: 'accessories',
  },
  {
    id: '10',
    name: 'Smart Coffee Maker',
    description: 'WiFi-enabled coffee maker with programmable brewing',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
    rating: 4.2,
    reviewCount: 31,
    inStock: true,
    category: 'home',
  },
  {
    id: '11',
    name: 'Air Purifier',
    description: 'HEPA air purifier with air quality monitoring',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
    rating: 4.6,
    reviewCount: 58,
    inStock: true,
    category: 'home',
  },
  {
    id: '12',
    name: 'Robot Vacuum',
    description: 'Smart robot vacuum with mapping and scheduling',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
    rating: 4.3,
    reviewCount: 44,
    inStock: false,
    category: 'home',
  },
  {
    id: '13',
    name: 'Gaming Mouse',
    description: 'High precision gaming mouse with RGB lighting',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
    rating: 4.5,
    reviewCount: 82,
    inStock: true,
    category: 'electronic',
  },
  {
    id: '14',
    name: 'Mechanical Keyboard',
    description: 'Mechanical keyboard with blue switches',
    price: 109.99,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    rating: 4.6,
    reviewCount: 73,
    inStock: true,
    category: 'electronic',
  },
  {
    id: '15',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with deep bass',
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Qmx1ZXRvb3RoJTIwU3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.5,
    reviewCount: 69,
    inStock: true,
    category: 'electronic',
  },
  {
    id: '16',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    rating: 4.2,
    reviewCount: 29,
    inStock: true,
    category: 'home',
  },
  {
    id: '17',
    name: 'Backpack',
    description: 'Water-resistant backpack with laptop compartment',
    price: 69.99,
    imageUrl:
      'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QmFja3BhY2t8ZW58MHx8MHx8fDA%3D',
    rating: 4.4,
    reviewCount: 46,
    inStock: true,
    category: 'accessories',
  },
  {
    id: '18',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    rating: 4.4,
    reviewCount: 64,
    inStock: true,
    category: 'clothing',
  },
  {
    id: '19',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with extra cushioning',
    price: 29.99,
    imageUrl:
      'https://media.istockphoto.com/id/1222422932/photo/low-section-of-man-with-exercise-equipment-on-hardwood-floor.webp?a=1&b=1&s=612x612&w=0&k=20&c=8MdPH9l_F3aK1lVTTkc_rCdJDs4fsVxnmcB5XpKhS7s=',
    rating: 4.3,
    reviewCount: 51,
    inStock: true,
    category: 'home',
  },
  {
    id: '20',
    name: 'Portable Power Bank',
    description: '10000mAh fast charging power bank',
    price: 49.99,
    imageUrl:
      'https://media.istockphoto.com/id/1206456691/photo/man-sitting-in-woods-and-charging-mobile-phone-with-power-bank-during-beautiful-day.webp?a=1&b=1&s=612x612&w=0&k=20&c=XSeV57QKdxujiziVtyo4lC98HYcN9Tsd4y0nxEvoYq0=',
    rating: 4.5,
    reviewCount: 91,
    inStock: true,
    category: 'electronic',
  },
];

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectProductId: string | undefined;
  writeReview: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: rawProducts.map((product) => ({
      ...product,
      reviews: generateReviews(product.id, product.reviewCount),
    })),
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectProductId: undefined,
    writeReview: false,
  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),

  withComputed(({ category, products, wishlistItems, cartItems, selectProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectProduct: computed(() => products().find((p) => p.id === selectProductId())),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectProductId: productId });
      }),

      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({
            product,
            quantity,
          });
        });
        patchState(store, { cartItems: updatedCartItems });
        // console.log("efrgt", existingItemIndex);

        toaster.success(existingItemIndex ? 'Product added again' : 'Product added to the cart');
      },

      setItemQuantity(params: { productId: string; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((c) => c.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find((p) => p.id === store.selectProductId());
        if (!product) {
          patchState(store, { loading: false });
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updateProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10,
            ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, { loading: false, products: updateProducts, writeReview: false });
      },
    }),
  ),
);
