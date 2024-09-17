import { Link } from "@remix-run/react";

const Products = () => {
  const productList = [
    {
      id: 1,
      name: "Graceful",
      img: "/images/products/bottle-1.png",
      price: "100.000",
    },
    {
      id: 2,
      name: "Gracious",
      img: "/images/products/bottle-2.png",
      price: "150.000",
    },
    {
      id: 3,
      name: "Creative",
      img: "/images/products/bottle-3.png",
      price: "200.000",
    },
    {
      id: 4,
      name: "Dynamic",
      img: "/images/products/bottle-4.png",
      price: "250.000",
    },
    {
      id: 5,
      name: "Rational",
      img: "/images/products/bottle-5.png",
      price: "300.000",
    },
    {
      id: 6,
      name: "Dependable",
      img: "/images/products/bottle-6.png",
      price: "350.000",
    },
    {
      id: 7,
      name: "Optimistic",
      img: "/images/products/bottle-7.png",
      price: "400.000",
    },
    {
      id: 8,
      name: "Elegant",
      img: "/images/products/bottle-8.png",
      price: "450.000",
    },
  ];

  return (
    <main className="mt-[--m-header-top] mb-8">
      <div className="flex justify-center mb-8">
        <img
          className="w-full max-w-6xl"
          src="/images/products/productcollection.png"
          alt="Product Collection"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-[#E8E8E4] shadow-md overflow-hidden p-4"
            >
              <div className="flex justify-center">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-[147px] h-[278px] object-cover"
                />
              </div>
              <div className="flex justify-between items-center p-2">
                <p className="font-semibold text-black p-0 m-0">
                  {product.name}
                </p>
                <p className="text-black">{product.price} VND</p>
              </div>
              <div className="flex justify-center">
                <Link to={`/products/${product.id}`}>
                  <button className="w-60 mt-4 py-2 bg-white text-black rounded hover:bg-slate-300">
                    Chi tiết sản phẩm
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
