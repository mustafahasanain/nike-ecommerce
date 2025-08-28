import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/db/schema';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
        
        // Update totals
        const newState = get();
        const totalItems = newState.items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = 0; // TODO: Fix when product schema includes price
        
        set({ totalItems, totalPrice });
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
        
        // Update totals
        const newState = get();
        const totalItems = newState.items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = 0; // TODO: Fix when product schema includes price
        
        set({ totalItems, totalPrice });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
        
        // Update totals
        const newState = get();
        const totalItems = newState.items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = 0; // TODO: Fix when product schema includes price
        
        set({ totalItems, totalPrice });
      },
      
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
      
      getCartTotal: () => {
        const { items } = get();
        return 0; // TODO: Fix when product schema includes price
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);