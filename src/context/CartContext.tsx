"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";

export interface CartItem {
  id: string; // unique item id: productId-size-fabric-sheetType-pieces
  productId: string;
  slug: string;
  title: string;
  price: number;
  comparePrice?: number;
  image: string;
  size: "Single" | "Double" | "King" | "Super King";
  fabric: string;
  sheetType?: "Flat Sheet Set" | "Fitted Sheet Set" | "Complete Bed-in-Bag";
  quantity: number;
  pieces?: string[];
  selectedAddOns?: string[];
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  shipping: number;
  total: number;
  giftWrap: boolean;
  setGiftWrap: (val: boolean) => void;
  giftWrapFee: number;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 3000;
const STANDARD_SHIPPING_FEE = 250;
const GIFT_WRAP_PRICE = 300;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("loom_living_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("loom_living_cart", JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const sheetTypeKey = newItem.sheetType || "Flat";
    const addOnKey = (newItem.selectedAddOns || []).sort().join("_");
    const itemId = `${newItem.productId}-${newItem.size}-${newItem.fabric}-${sheetTypeKey}-${addOnKey}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id: itemId }];
    });

    toast(`Added "${newItem.title}" (${newItem.size}) to your bag`);
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      toast(`Removed "${item.title}" from your bag`, "info");
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setGiftWrap(false);
    setOrderNotes("");
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === "WELCOME10" || trimmed === "LOOM10") {
      setCouponCode(trimmed);
      setDiscountPercent(10);
      toast("Coupon applied: 10% discount added!");
      return true;
    }
    if (trimmed === "AZADI" || trimmed === "LINEN15" || trimmed === "EID15") {
      setCouponCode(trimmed);
      setDiscountPercent(15);
      toast("Coupon applied: 15% discount added!");
      return true;
    }
    toast("Invalid coupon code. Try WELCOME10", "error");
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
    toast("Coupon removed", "info");
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const giftWrapFee = giftWrap ? GIFT_WRAP_PRICE : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping + giftWrapFee);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        shipping,
        total,
        giftWrap,
        setGiftWrap,
        giftWrapFee,
        orderNotes,
        setOrderNotes,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
