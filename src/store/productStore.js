import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],
  selectedProductId: null,

  setProducts: (products) => set({ products }),

  setSelectedProductId: (id) => set({ selectedProductId: id }),

  clearSelectedProductId: () => set({ selectedProductId: null }),
  getSelectedProduct: () => {
    const { products, selectedProductId } = get();
    return products.find((product) => product.id === selectedProductId) || null;
  },

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id:
            state.products.length > 0
              ? Math.max(...state.products.map((p) => p.id)) + 1
              : 1,
        },
      ],
    })),

  getProductById: (id) => get().products.find((product) => product.id === id),

  updateProduct: (id, updatedData) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
