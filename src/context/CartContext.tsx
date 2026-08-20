import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, OrderDetails } from '../types/index.ts';
import { SITE_CONFIG } from '../data/constants.ts';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (serviceId: string, tierId: string) => void;
  updateQuantity: (serviceId: string, tierId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeOrder: OrderDetails | null;
  submitOrder: (details: Omit<OrderDetails, 'orderId' | 'createdAt' | 'orderStatus' | 'items' | 'totalAmount'>) => OrderDetails;
  pastOrders: OrderDetails[];
  quickBuyItem: CartItem | null;
  setQuickBuyItem: (item: CartItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'usasmm_cart_items';
const ORDERS_STORAGE_KEY = 'usasmm_orders_history';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [pastOrders, setPastOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);
  const [quickBuyItem, setQuickBuyItem] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(pastOrders));
    } catch (e) {
      console.error(e);
    }
  }, [pastOrders]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const index = prev.findIndex(
        (i) => i.serviceId === newItem.serviceId && i.tierId === newItem.tierId
      );
      if (index > -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + newItem.quantity,
        };
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (serviceId: string, tierId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.serviceId === serviceId && i.tierId === tierId))
    );
  };

  const updateQuantity = (serviceId: string, tierId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.serviceId === serviceId && i.tierId === tierId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
    setQuickBuyItem(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'USASMM10' || clean === 'VIP10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      return true;
    } else if (clean === 'FIRST5' || clean === 'USA5') {
      setPromoCode(clean);
      setDiscountPercent(5);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const checkoutItems = quickBuyItem ? [quickBuyItem] : items;

  const totalItems = checkoutItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const discount = Math.round((subtotal * discountPercent) / 100);
  const totalPrice = Math.max(0, subtotal - discount);

  const submitOrder = (
    details: Omit<OrderDetails, 'orderId' | 'createdAt' | 'orderStatus' | 'items' | 'totalAmount'>
  ): OrderDetails => {
    const orderId = 'USA-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderDetails = {
      ...details,
      orderId,
      items: [...checkoutItems],
      totalAmount: totalPrice,
      orderStatus: 'pending_payment',
      createdAt: new Date().toISOString(),
    };

    setPastOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    if (!quickBuyItem) {
      clearCart();
    } else {
      setQuickBuyItem(null);
    }
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        totalPrice,
        promoCode,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeOrder,
        submitOrder,
        pastOrders,
        quickBuyItem,
        setQuickBuyItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
