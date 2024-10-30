// import { json, LoaderFunctionArgs } from "@remix-run/node";
// import { useLoaderData, useParams } from "@remix-run/react";
// import { useQueryClient } from "@tanstack/react-query";
// import { message } from "antd";
// import { useMemo, useState } from "react";
// import { SubFooter } from "~/components";
// import Dropdown from "~/components/Dropdown";
// import Quantity from "~/components/Quantity";
// import { formatMoney } from "~/components/utils";
// import { addToCart, getProductById, Product, useGetProfile } from "~/data";

// type LoaderData = {
//   product: Product;
// }

// export async function loader({ params }: LoaderFunctionArgs) {
//   let productId = params.productId;
//   try {
//     let product = await getProductById(productId || "");
//     if (product) {
//       return json({ product });
//     }
//     return json({}, { status: 404 });
//   } catch (error) {
//     return json({}, { status: 404 });
//   }
// }

// const ProductDetail = () => {
//   const { product } = useLoaderData<LoaderData>();
//   const profile = useGetProfile();
//   const queryClient = useQueryClient();
//   const [quantity, setQuantity] = useState<number>(1);

//   const handleAddToCart = async () => {
//     try {
//       let response = await addToCart(profile.data?.user?.token || "", {
//         productId: product.productId,
//         quantity: quantity,
//       });

//       if (response) {
//         message.success("Thêm vào giỏ hàng thành công");
//         queryClient.invalidateQueries({
//           queryKey: ['in-cart'],
//         });
//       }
//     } catch (error: any) {
//       message.error(`Có lỗi xảy ra: ${error?.message}`);
//     }
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <main className="mt-[--m-header-top] mb-8">
//       <div className="flex justify-center mb-8">
//         <img
//           className="w-full max-w-6xl"
//           src="/images/products/productcollection.png"
//           alt="Product Collection"
//         />
//       </div>
//       <div className="container mx-auto px-12">
//         <div className="flex p-12 space-x-8">
//           <div className="w-1/3 bg-[#e8e8e4] flex justify-center ">
//             <img
//               className="w-[274px] h-[525px] aspect-[160/525]"
//               src={product.imageUrl}
//               alt={product.name}
//             />
//           </div>
//           <div className="w-2/3">
//             <div className="pl-10 space-y-8">
//               <p className="text-xl text-black">
//                 Bình giữ nhiệt <span className="font-semibold">{product.name}</span>
//               </p>

//               <div className="flex space-x-56">
//                 <p className="text-lg font-semibold text-black">
//                   Giá: {formatMoney(product.price)}
//                 </p>
//                 <p className="text-black font-semibold text-lg">
//                   Đã bán: <span>{product.sold}</span>
//                 </p>

//               </div>
//               <div> <Dropdown /></div>
//               <div className="flex space-x-48">
//                 <div><Quantity quantity={quantity} setQuantity={setQuantity} /></div>
//                 <button onClick={handleAddToCart} className="w-48 h-12 bg-[#0055c3] rounded-lg text-white">
//                   Thêm vào giỏ hàng
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-12 flex flex-col gap-5">
//           <div className="flex items-center bg-[#0255C3] gap-8">
//             <img src="/images/description.jpg" alt="description" className="aspect-[576-572] w-1/2" />
//             <div className="flex-1 text-white">
//               <h4 className="text-white font-bold text-xl uppercase">
//                 Mô tả sản phẩm
//               </h4>
//               <ul className="list-disc pt-2 space-y-2 text-base">
//                 <li>
//                   Dung tích: 500ml
//                 </li>
//                 <li>
//                   Chất liệu: Inox không gỉ 304
//                 </li>
//                 <li>
//                   Đựng được nước nóng/ấm/lạnh
//                 </li>
//                 <li>
//                   Giữ nhiệt từ 6 - 12 tiếng
//                 </li>
//                 <li>
//                   Sản phẩm được dán bằng Decal chuyên dụng chống thấm nước
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="flex items-center bg-[#0255C3] gap-8 py-5">
//             <img src="/images/guide.jpg" alt="guide" className="aspect-[576-572] w-1/2" />
//             <div className="flex-1 text-white">
//               <h4 className="text-white font-bold text-xl uppercase">
//                 HƯỚNG DẪN BẢO QUẢN
//               </h4>
//               <ul className="list-decimal pt-2 space-y-2 text-base">
//                 <li>
//                   Rửa sạch bằng tay và dùng khăn mềm thấm lau sạch sản phẩm, hạn chế để nước đọng lại trên bề mặt bình
//                 </li>
//                 <li>
//                   Không dùng bất kỳ vật cứng nào chà xát bề mặt bình
//                 </li>
//                 <li>
//                   Tránh để sản phẩm tiếp xúc với nhiệt độ cao trong thời gian dài
//                 </li>
//                 <li>
//                   Không ngâm sản phẩm trong nước
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         {/* <div className="p-12  space-y-3 ">
//           <p className="uppercase  text-lg font-semibold text-black">
//             Đánh giá từ khách hàng
//           </p>
//           <p>2 đánh giá</p>
//           <div className="border-b-2 pb-4 space-y-3">
//             <div className="flex items-center space-x-3">
//               <img className="h-12 w-12" src="/images/avatar.png" alt="" />
//               <p className="font-semibold text-black">Bao BT</p>
//               <div className="flex items-center     ">
//                 <svg
//                   className="w-6 h-6 ms-2 text-yellow-300"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 20"
//                 >
//                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                 </svg>
//                 <svg
//                   className="w-6 h-6 ms-2 text-yellow-300"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 20"
//                 >
//                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                 </svg>
//                 <svg
//                   className="w-6 h-6 ms-2 text-yellow-300"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 20"
//                 >
//                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                 </svg>
//                 <svg
//                   className="w-6 h-6 ms-2 text-yellow-300"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 20"
//                 >
//                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                 </svg>
//                 <svg
//                   className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 20"
//                 >
//                   <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                 </svg>
//               </div>
//             </div>
//             <p>Bình xinh lắm nha, giữ nhiệt cũng tốt nữa</p>
//             <div>

//             </div>

//           </div>
//           <div className="border-[#0055c3] border-2 rounded-3xl p-8 space-y-4 ">


//             <p className="text-black">Đánh giá của bạn:</p>
//             <div className="flex items-center     ">
//               <svg
//                 className="w-6 h-6  text-[#d9d9d9] dark:text-[#d9d9d9]"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 20"
//               >
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg
//                 className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 20"
//               >
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg
//                 className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 20"
//               >
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg
//                 className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 20"
//               >
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//               <svg
//                 className="w-6 h-6 ms-2 text-[#d9d9d9] dark:text-[#d9d9d9]"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 20"
//               >
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//               </svg>
//             </div>
//             <p>Nhận xét của bạn:</p>
//             <input type="text" className="w-full h-[150px]" />
//           </div>
//         </div> */}
//       </div>
//       <div>
//         <SubFooter />
//       </div>
//     </main>
//   );
// };

// export default ProductDetail;
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useMemo, useState } from "react";
import { SubFooter } from "~/components";
import Dropdown from "~/components/Dropdown";
import Quantity from "~/components/Quantity";
import { formatMoney } from "~/components/utils";
import { addToCart, getProductById, Product, useGetProfile } from "~/data";

type LoaderData = {
  product: Product;
}

export async function loader({ params }: LoaderFunctionArgs) {
  let productId = params.productId;
  try {
    let product = await getProductById(productId || "");
    if (product) {
      return json({ product });
    }
    return json({}, { status: 404 });
  } catch (error) {
    return json({}, { status: 404 });
  }
}

const ProductDetail = () => {
  const { product } = useLoaderData<LoaderData>();
  const profile = useGetProfile();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = async () => {
    try {
      let response = await addToCart(profile.data?.user?.token || "", {
        productId: product.productId,
        quantity: quantity,
      });

      if (response) {
        message.success("Thêm vào giỏ hàng thành công");
        queryClient.invalidateQueries({
          queryKey: ['in-cart'],
        });
      }
    } catch (error: any) {
      message.error(`Có lỗi xảy ra: ${error?.message}`);
    }
  }

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
      <div className="container mx-auto px-4 sm:px-12">
        <div className="flex flex-col sm:flex-row p-4 sm:p-12 space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="w-full sm:w-1/3 bg-[#e8e8e4] flex justify-center">
            <img
              className="w-[274px] h-[525px] aspect-[160/525]"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className="w-full sm:w-2/3">
            <div className="pl-0 sm:pl-10 space-y-8">
              <p className="text-lg sm:text-xl text-black">
                Bình giữ nhiệt <span className="font-semibold">{product.name}</span>
              </p>

              <div className="flex space-x-4 sm:space-x-56">
                <p className="text-lg font-semibold text-black">
                  Giá: {formatMoney(product.price)}
                </p>
                <p className="text-black font-semibold text-lg">
                  Đã bán: <span>{product.sold}</span>
                </p>
              </div>

              {/* <div> <Dropdown/></div> */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div><Quantity quantity={quantity} setQuantity={setQuantity} /></div>
                <button onClick={handleAddToCart} className="w-full sm:w-48 h-12 bg-[#0055c3] rounded-lg text-white">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-12 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-center bg-[#0255C3] gap-8">
            <img src="/images/description.jpg" alt="description" className="aspect-[576-572] w-full sm:w-1/2" />
            <div className="flex-1 text-white p-4 sm:p-0">
              <h4 className="text-white font-bold text-lg sm:text-xl uppercase">
                Mô tả sản phẩm
              </h4>
              <ul className="list-disc pt-2 space-y-2 text-sm sm:text-base">
                <li>
                  Dung tích: 500ml
                </li>
                <li>
                  Chất liệu: Inox không gỉ 304
                </li>
                <li>
                  Đựng được nước nóng/ấm/lạnh
                </li>
                <li>
                  Giữ nhiệt từ 6 - 12 tiếng
                </li>
                <li>
                  Sản phẩm được dán bằng Decal chuyên dụng chống thấm nước
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center bg-[#0255C3] gap-8 py-5">
            <img src="/images/guide.jpg" alt="guide" className="aspect-[576-572] w-full sm:w-1/2" />
            <div className="flex-1 text-white p-4 sm:p-0">
              <h4 className="text-white font-bold text-lg sm:text-xl uppercase">
                HƯỚNG DẪN BẢO QUẢN
              </h4>
              <ul className="list-decimal pt-2 space-y-2 text-sm sm:text-base">
                <li>
                  Rửa sạch bằng tay và dùng khăn mềm thấm lau sạch sản phẩm, hạn chế để nước đọng lại trên bề mặt bình
                </li>
                <li>
                  Không dùng bất kỳ vật cứng nào chà xát bề mặt bình
                </li>
                <li>
                  Tránh để sản phẩm tiếp xúc với nhiệt độ cao trong thời gian dài
                </li>
                <li>
                  Không ngâm sản phẩm trong nước
                </li>
              </ul>
            </div>
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
