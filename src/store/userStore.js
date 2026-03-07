import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: () => set({ user: null, isAuthenticated: false }),

  getUser: () => get().user,

  isUserAdmin: () => get().user?.role === 'admin',

  isUserClient: () => get().user?.role === 'user',

  setLoading: (loading) => set({ isLoading: loading }),
}));
