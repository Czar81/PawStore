import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: (item.quantity + 1) * item.price,
                }
              : item
          ),
        };
      }
      return {
        cart: [
          ...state.cart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            subtotal: product.price,
            image: product.image,
          },
        ],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity, subtotal: quantity * item.price }
          : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  get total() {
    return get().cart.reduce((sum, item) => sum + item.subtotal, 0);
  },
}));
