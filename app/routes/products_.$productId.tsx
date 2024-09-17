import { useParams } from "@remix-run/react";
import { SubFooter } from "~/components";

const ProductDetail = () => {
  const { productId } = useParams();
  const productList = [
    {
      id: 1,
      name: "Graceful",
      img: "/images/products/bottle-1.png",
      price: "100.000",
      description: "A graceful product with exceptional quality.",
    },
    {
      id: 2,
      name: "Gracious",
      img: "/images/products/bottle-2.png",
      price: "150.000",
      description: "A gracious product that exemplifies elegance.",
    },
    {
      id: 3,
      name: "Creative",
      img: "/images/products/bottle-3.png",
      price: "200.000",
      description: "A creative product designed for innovation.",
    },
    {
      id: 4,
      name: "Dynamic",
      img: "/images/products/bottle-4.png",
      price: "250.000",
      description: "A dynamic product full of energy and style.",
    },
  ];

  const product = productList.find((p) => p.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="mt-[--m-header-top] mb-8">
      <div className="flex justify-center mb-8">
        <img
          className="w-full max-w-6xl"
          src="/images/products/productcollection.png"
          alt="Product Collection"
        />
      </div>
      <div className="container mx-auto px-12">
        <div className="flex p-12 space-x-8">
          <div className="w-1/3 bg-[#e8e8e4] flex justify-center ">
            <img
              className="w-[274px] h-[525px] relative"
              src={product.img}
              alt=""
            />
          </div>
          <div className="w-2/3">
            <div className="pl-10 space-y-14">
              <p className="text-xl text-black">
                Bình giữ nhiệt <span className="font-semibold">Graceful</span>
              </p>

              <div className="flex space-x-56">
                <p className="text-lg font-semibold text-black">
                  Giá: {product.price} VND
                </p>
                <p className="text-black font-semibold text-lg">
                  Đã bán: <span>2</span>
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="p-12  space-y-3 ">
          <p className="uppercase  text-lg font-semibold text-black">
            Đánh giá từ khách hàng
          </p>
          <p>2 đánh giá</p>
          <div className="border-b-2 pb-4 space-y-3">
            <div className="flex items-center space-x-3">
              <img className="h-12 w-12" src="/images/avatar.png" alt="" />
              <p className="font-semibold text-black">Bao BT</p>
              <div className="flex items-center     ">
                <svg
                  className="w-6 h-6 ms-2 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            </div>
            <p>Bình xinh lắm nha, giữ nhiệt cũng tốt nữa</p>
          <div>
          
          </div>
         
          </div>
          <div className="border-[#0055c3] border-2 rounded-3xl p-8 space-y-4 ">

          
          <p className="text-black">Đánh giá của bạn:</p>
          <div className="flex items-center     ">
                <svg
                  className="w-6 h-6  text-[#d9d9d9] dark:text-[#d9d9d9]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
           <p>Nhận xét của bạn:</p>
           <input type="text" className="w-full h-[150px]" />
        </div>
        </div>
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
};

export default ProductDetail;
