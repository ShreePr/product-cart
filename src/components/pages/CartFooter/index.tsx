import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const CartFooter = () => {
  return (
    <button className="w-full mt-4 bg-black text-white py-4 rounded flex justify-between items-center">
      <p className="ml-4 font-bold">Checkout</p>
      <ShoppingBagIcon className="w-6 h-6 ml-auto mr-4" />
    </button>
  );
};

export default CartFooter;
