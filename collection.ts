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
  removeItem: (productId: string, size?: string, color?: string) => void;
  deleteCartProduct: (productId: string, size?: string, color?: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string, size?: string, color?: string) => number;
  getProductCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  //   // favorite
  favoriteProduct: Product[];
  addToFavorite: (product: Product) => Promise<void>;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
}

const getVariantKey = (id: string, size?: string, color?: string) => 
  `${id}-${size || 'nosize'}-${color || 'nocolor'}`;

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],
      addItem: (product) =>
        set((state) => {
          const size = (product as any).selectedSize;
          const color = (product as any).selectedColor;
          const variantKey = getVariantKey(product._id, size, color);

          const existingItem = state.items.find(
            (item) => getVariantKey(item.product._id, (item.product as any).selectedSize, (item.product as any).selectedColor) === variantKey,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                getVariantKey(item.product._id, (item.product as any).selectedSize, (item.product as any).selectedColor) === variantKey
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId, size, color) =>
        set((state) => {
          const variantKey = getVariantKey(productId, size, color);
          return {
            items: state.items.reduce((acc, item) => {
              if (getVariantKey(item.product._id, (item.product as any).selectedSize, (item.product as any).selectedColor) === variantKey) {
                if (item.quantity > 1) {
                  acc.push({ ...item, quantity: item.quantity - 1 });
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, [] as CartItem[]),
          };
        }),
      deleteCartProduct: (productId, size, color) =>
        set((state) => {
          const variantKey = getVariantKey(productId, size, color);
          return {
            items: state.items.filter(
              ({ product }) => getVariantKey(product?._id, (product as any).selectedSize, (product as any).selectedColor) !== variantKey,
            ),
          };
        }),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId, size, color) => {
        const variantKey = getVariantKey(productId, size, color);
        const item = get().items.find((item) => getVariantKey(item.product._id, (item.product as any).selectedSize, (item.product as any).selectedColor) === variantKey);
        return item ? item.quantity : 0;
      },
      getProductCount: (productId) => {
        return get().items.reduce((total, item) => {
          if (item.product._id === productId) {
            return total + item.quantity;
          }
          return total;
        }, 0);
      },
      getGroupedItems: () => get().items,
      addToFavorite: (product: Product) => {
        return new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id,
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id,
                  )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },
      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item?._id !== productId,
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "cart-store",
    },
  ),
);

export default useStore;
