import React, { useState, useEffect } from "react";
import { getOrdersInCart, useGetProfile } from "~/data";
import { Model } from "./Model";

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

interface CartItem {
  id: string; 
  topImage: string; 
  bodyImage: string; 
  strapImage: string; 
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  token: string; 
}

const Cart: React.FC<CartProps> = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const profile = useGetProfile();
  const token = profile.data?.user?.token;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getOrdersInCart(token);
        const items = response.map((item: any) => {
          const { orderDetailId, productImageURL, productName, unitPrice, quantity } = item;
          let topImage = '';
          let bodyImage = '';
          let strapImage = '';
    
          if (productImageURL) {
            const images = splitProductImageURLs(productImageURL);
            topImage = images.top;
            bodyImage = images.body;
            strapImage = images.strap;
          }
    
          return {
            id: orderDetailId,
            topImage,
            bodyImage,
            strapImage,
            name: productName,
            price: unitPrice,
            quantity,
          };
        });
        setCartItems(items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    
    fetchCartItems();
  }, [token]); 

  function splitProductImageURLs(productImageURL: string): { top: string; body: string; strap: string } {
    const parts = productImageURL.split(',');
    if (parts.length !== 3) {
      // If not exactly 3 parts, consider it as a full image
      return {
        top: productImageURL.trim(),  
        body: '',  
        strap: ''   
      };
    }
    return {
      top: parts[0].trim(),   
      body: parts[1].trim(),  
      strap: parts[2].trim()   
    };
  }

  const handleCartClick = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
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
                  {item.bodyImage && item.strapImage ? (
                    <Model 
                      topImage={item.topImage} 
                      bodyImage={item.bodyImage} 
                      strapImage={item.strapImage} 
                      width="100px" 
                    />
                  ) : (
                    <img src={item.topImage} alt={item.name} width="100px" />
                  )}
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
