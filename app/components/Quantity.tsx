import { useState } from 'react';

function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center space-x-4">
    {/* Wrap the quantity component in a fixed-width container */}
    <div className="flex items-center justify-between w-32 border border-black rounded-full px-2 py-1">
      <button
        onClick={decreaseQuantity}
        className="text-black px-2 text-xl focus:outline-none"
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button
        onClick={increaseQuantity}
        className="text-black px-2 text-xl focus:outline-none"
      >
        +
      </button>
    </div>
    </div>
  );
}

export default Quantity;
