// src/components/Cart.js

import React, { useState } from "react";

// Hàm formatMoney để định dạng số tiền theo quy tắc của tiền Việt Nam
const formatMoney = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      img: "/images/products/binh1.png",
      name: "Sản phẩm 1",
      price: 200000,
      quantity: 1,
    },
    {
      id: 2,
      img: "/images/products/bottle-2.png",
      name: "Sản phẩm 2",
      price: 150000,
      quantity: 2,
    },
    {
      id: 3,
      img: "/images/products/bottle-3.png",
      name: "Sản phẩm 3",
      price: 300000,
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotalPrice = () => {
    const itemTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingFee = itemTotal >= 1000000 ? 0 : 20000;
    return {
      itemTotal,
      total: itemTotal + shippingFee,
      shippingFee,
    };
  };

  const { itemTotal, total, shippingFee } = calculateTotalPrice();

  return (
    <div className="relative">
      <img
        className="cursor-pointer w-6 h-6"
        src="/icons/shopping-cart.png"
        alt="Shopping Cart Icon"
        onClick={handleCartClick}
      />
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-[500px] bg-white border border-gray-300 rounded-[10px] shadow-lg z-10">
          <div className="flex justify-between items-center p-4">
            <p className="text-center font-bold">Giỏ hàng của bạn</p>
            <button
              onClick={handleCloseCart}
              className="text-gray-600 hover:text-black text-xl"
            >
              <img
                className="cursor-pointer w-4 h-4"
                src="/icons/close.png"
                alt="Close Icon"
              />
            </button>
          </div>
          <div className="p-4 h-[300px] overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[74px] h-[142px]"
                  />
                  <div className="flex flex-col flex-1 ml-4">
                    <div className="flex justify-between items-center w-full">
                      <p className="font-light">
                        Bình giữ nhiệt:{" "}
                        <span className="font-bold">{item.name}</span>
                      </p>
                      <p className="text-gray-600">{formatMoney(item.price)}</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
            )}
          </div>
          <div className="p-4 border-t border-gray-300 rounded-b-[5px] bg-gray-50">
            <div className="flex flex-col items-end">
              <div className="text-right mb-2">
                <p>Phí giao hàng: {formatMoney(shippingFee)}</p>
              </div>
              <div className="text-right font-bold mb-2">
                <p>Tổng số tiền phải trả: {formatMoney(total)}</p>
              </div>
            </div>
            <div className="flex justify-center w-full mt-4">
              <button className="bg-[#0055C3] text-white py-2 px-6 rounded-lg text-lg font-semibold">
                Tiếp tục thanh toán
              </button>
            </div>
            <div className="flex justify-center w-full mt-4">
              <p>Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
