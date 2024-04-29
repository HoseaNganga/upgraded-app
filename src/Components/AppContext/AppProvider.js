"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.price;
  if (cartProduct.extras) {
    price += cartProduct.extras.price;
  }
  if (cartProduct.size?.length > 0) {
    for (const size of cartProduct.size) {
      price += size.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;
  function saveCartProductsToLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }
  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = {
        ...product,
        size,
        extras,
      };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevProducts) => {
      const newCartProducts = prevProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success(`Item successfully removed`);
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem(`cart`)) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
