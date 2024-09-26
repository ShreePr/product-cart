import React, { useState } from "react";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { CartItem } from "./Cart.interface";
import CartFooter from "../CartFooter";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "OBSIDIAN INK",
      brand: "Swatch",
      image: "https://drive.google.com/thumbnail?id=1kr9ju1nx4w7SWLgnZHk1PXjSwROOJGpV&export=view",
      quantity: 1,
      price: 115.0
    }
  ]);
  const [removingItem, setRemovingItem] = useState<number | null>(null);
  const [isFadingOut, setIsFadingOut] = useState<number | null>(null);

  // Function to remove an item from the cart
  const removeFromCart = (id: number): void => {
    setRemovingItem(id);
    // Hold the red background for 500ms, then fade out for 300ms
    setTimeout(() => {
      setIsFadingOut(id);
      setTimeout(() => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        setRemovingItem(null);
        setIsFadingOut(null);
      }, 300);
    }, 500);
  };

  // Function to update the quantity of a product
  const updateQuantity = (id: number, quantity: number): void => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item)));
  };

  // Function to calculate total price
  const calculateTotal = (): string => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-lg w-full p-4 bg-white">
        <div className="flex justify-between items-center rounded py-4 bg-black text-white px-4">
          <h2 className="text-xl font-bold">Your bag</h2>
        </div>

        {cart.length > 0 ? (
          <div className="p-4">
            {cart.map((item) => (
              <div key={item.id} className={`border-b py-4 transition-all duration-300 ${removingItem === item.id ? "bg-red-500" : isFadingOut === item.id ? "opacity-0" : "opacity-100"}`}>
                {/* Product Info Section */}
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <img src={item.image} alt={item.name} className="w-24 h-24 mr-3" />
                    <div>
                      <h3 className="font-bold">{item.brand}</h3>
                      <p>{item.name}</p>
                    </div>
                  </div>

                  {/* Delete Button Section */}
                  <div>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-600">
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Quantity Update Section */}
                <div className="flex items-center justify-end  mx-30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button className="px-2 py-1 text-xl border rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button className="px-2 py-1 text-xl border rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price Section */}
                    <div className="text-right mx-16 font-bold">
                      <p>£{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-4">
            <p>Oops!</p>
            <p>You have no items in your shopping cart.</p>{" "}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-lg mx-auto bg-#f3f3f3">
        <div className="flex justify-between text-lg font-bold">
          <p>Your total</p>
          <p>£{calculateTotal()}</p>
        </div>
        <CartFooter />
      </div>
    </div>
  );
};

export default Cart;
