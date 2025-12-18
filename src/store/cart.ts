import { CartItem } from "@/types/cart-item";
import { create } from "zustand";

type CartState = {
    cart: CartItem[];
    shippingZipCode: string;
    shippingCost: number;
    shippingDays: number;
    selectedAdressId: number | null;
    addItem: (cartItem: CartItem) => void;
    removeItem: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    setShippingZipcode: (zipCode: string) => void;
    setShippingCost: (cost: number) => void;
    setShippingDays: (days: number) => void;
    setSelectedAdressId: (id: number | null) => void;
    clearCart: () => void;
    clearShipping: () => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    shippingZipCode: "",
    shippingCost: 0,
    shippingDays: 0,
    selectedAdressId: null,
    addItem: ({ productId, quantity }) =>
        set((state) => {
            const existing = state.cart.find(
                (item) => item.productId === productId
            );
            let newCart;
            if (existing) {
                newCart = state.cart.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newCart = [...state.cart, { productId, quantity }];
            }

            return { cart: newCart };
        }),
    removeItem: (productId) =>
        set((state) => {
            const newCart = state.cart.filter(
                (item) => item.productId !== productId
            );
            return { cart: newCart };
        }),
    updateQuantity: (productId, quantity) =>
        set((state) => {
            const newCart = state.cart.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            );
            return { cart: newCart };
        }),
    setShippingZipcode: (zipCode) => set({ shippingZipCode: zipCode }),
    setShippingCost: (cost) => set({ shippingCost: cost }),
    setShippingDays: (days) => set({ shippingDays: days }),
    setSelectedAdressId: (id) => set({ selectedAdressId: id }),
    clearCart: () =>
        set({
            cart: [],
            shippingZipCode: "",
            shippingCost: 0,
            shippingDays: 0,
            selectedAdressId: null,
        }),
    clearShipping: () =>
        set({
            shippingZipCode: "",
            shippingCost: 0,
            shippingDays: 0,
            selectedAdressId: null,
        }),
}));
