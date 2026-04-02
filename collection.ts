import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  addItem: (product: Product) => void;
  //   removeItem: (productId: string) => void;
  //   deleteCartProduct: (productId: string) => void;
  //   resetCart: () => void;
  //   getTotalPrice: () => number;
  //   getSubTotalPrice: () => number;
  //   getItemCount: (productId: string) => number;
  //   getGroupedItems: () => CartItem[];
  favoriteProduct: Product[];
  //   addToFavorite: (product: Product) => void;
  //   removeFromFavorite: (productId: string) => void;
  //   resetFavorite: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
    }),
    {
      name: "cart-store",
    },
  ),
);
