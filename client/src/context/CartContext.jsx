import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  // ✅ LocalStorage kaydı
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Toplamlar
  const totals = useMemo(() => {
    const items = cart.reduce((a, x) => a + (x.qty || 0), 0);
    const subtotal = cart.reduce((a, x) => a + Number(x.price || 0) * (x.qty || 0), 0);
    return { items, subtotal };
  }, [cart]);

  // ✅ Sepete ekle
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id);

      if (found) {
        // stok kontrolü (varsa)
        const max = Number(product.stock ?? found.stock ?? 99999);
        if (found.qty >= max) return prev;

        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: (x.qty || 0) + 1 } : x
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Adet artır
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;

        const max = Number(x.stock ?? 99999);
        if ((x.qty || 0) >= max) return x;

        return { ...x, qty: (x.qty || 0) + 1 };
      })
    );
  };

  // ✅ Adet azalt (1 olunca kaldırır)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: (x.qty || 0) - 1 } : x))
        .filter((x) => (x.qty || 0) > 0)
    );
  };

  // ✅ Ürünü kaldır
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totals,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
