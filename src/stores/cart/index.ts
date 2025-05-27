import { defineStore } from "pinia";
import type { Cart } from "@/types/cart";

export const useCartStore = defineStore("cart-store", () => {
  const storedCart = localStorage.getItem("cart");
  const cart = ref<Cart>(
    storedCart
      ? JSON.parse(storedCart)
      : {
          id: "1",
          items: [],
          total: 0,
        },
  );

  const updateCart = () => {
    const itemsWithSubtotal = cart.value.items.map((item) => ({
      ...item,
      subtotal: item.quantity * item.price,
    }));
    const total = itemsWithSubtotal.reduce(
      (sum, item) => sum + item.subtotal,
      0,
    );
    cart.value.items = itemsWithSubtotal;
    cart.value.total = total;
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const saveCart = (): void => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  return {
    cart,
    updateCart,
    saveCart,
  };
});
