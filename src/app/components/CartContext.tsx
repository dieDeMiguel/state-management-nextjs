"use client";
import { type Cart } from "@/api/types";
import React, { createContext, useState } from "react";

const useCartState = (initialCart: Cart) => useState<Cart>(initialCart);

export const CartContext = createContext<ReturnType<
  typeof useCartState
> | null>(null);

export const useCart = () => {
  const cart = React.useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cart;
};

const CartProvider = ({
  children,
  cart: initialCart,
}: {
  children: React.ReactNode;
  cart: Cart;
}) => {
  const [cart, setCart] = useCartState(initialCart);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
