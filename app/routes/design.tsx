// import _ from "lodash";
// import { useEffect, useMemo, useState } from "react";
// import { IoAddCircleSharp, IoArrowBackCircle, IoArrowForwardCircle, IoColorFillOutline } from "react-icons/io5";
// import { SubFooter } from "~/components";
// import { BottleComponent } from "~/data/types";
// import { ReviewModal } from "~/components";
// import { addToCart, createCustomProduct, useGetComponentList } from "~/data";
// import { useGetProfile } from "~/data";
// import { useQueryClient } from "@tanstack/react-query";
// import { message } from "antd";
// import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
// import { authenticator } from "~/services/auth.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   let user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     return redirect(`/login?message=${encodeURIComponent("Vui lòng đăng nhập để tiếp tục")}&type=error`);
//   }
//   return json({}, { status: 200 });
// }

// const options = [
//   {
//     name: "Thân bình",
//     value: "body",
//   },
//   {
//     name: "Nắp bình",
//     value: "top",
//   },
//   {
//     name: "Quai bình",
//     value: "strap",
//   }
// ];

// export default function Design() {
//   const [active, setActive] = useState("body"); // hợp nhất search và activeOption
//   const [top, setTop] = useState<BottleComponent | null>(null); // lưu component được chọn cho top
//   const [body, setBody] = useState<BottleComponent | null>(null); // lưu component được chọn cho body
//   const [strap, setStrap] = useState<BottleComponent | null>(null); // lưu component được chọn cho strap
//   const [engrave, setEngrave] = useState<string>(""); // Biến để lưu nội dung khắc
//   const [engravePosition, setEngravePosition] = useState<string>("");
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // state để điều khiển mở/đóng modal
//   const [isGift, setisGift] = useState(false);
//   const component = useGetComponentList(active);
//   const queryClient = useQueryClient();
//   const componentList = useMemo(() => {
//     return _(component.data)
//       .orderBy(it => it.name, "asc")
//       .value();
//   }, [component.data]);

//   const profile = useGetProfile();

//   const handleOptionClick = (value: string) => {
//     setActive(value);
//   };

//   const handleEngraveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEngrave(event.target.value);
//   };

//   const handleEngravePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEngravePosition(event.target.value);
//   };

//   const handleColorSelect = (optionValue: string, component: BottleComponent) => {
//     if (optionValue === "top") {
//       setTop(component);
//     } else if (optionValue === "body") {
//       setBody(component);
//     } else if (optionValue === "strap") {
//       setStrap(component);
//     }
//   };

//   const handleReview = () => {
//     setIsReviewModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsReviewModalOpen(false);
//   };

//   const handleReset = () => {
//     setTop(null);
//     setBody(null);
//     setStrap(null);
//     setEngrave("");
//     setEngravePosition("");
//   };

//   const handleAddToCart = async () => {
//     if (!top || !body || !strap) {
//       if (!top && !body) {
//         message.warning("Xin lỗi, vui lòng chọn cả nắp bình và thân bình.");
//       } else if (!top) {
//         message.warning("Xin lỗi, vui lòng chọn nắp bình.");
//       } else if (!body) {
//         message.warning("Xin lỗi, vui lòng chọn thân bình.");
//       } else if (!strap) {
//         message.warning("Xin lỗi, vui lòng chọn quai bình.");
//       }
//     } else {
//       try {
//         const response = await createCustomProduct(profile.data?.user?.token || '', {
//           topComponentId: top.componentId,
//           bodyComponentId: body.componentId,
//           strapComponentId: strap?.componentId,
//           engrave: engrave ? engrave : null,
//           engravePosition: engravePosition ? engravePosition : null,
//           isGift: isGift
//         })

//         if (response) {
//           const productId = response.productId;
//           const addToCartResponse = await addToCart(profile.data?.user?.token || '', {
//             productId,
//             quantity: 1,
//           })

//         if (addToCartResponse) {
//           console.log('Product added to cart:', addToCartResponse);
//           message.success("Thêm vào giỏ hàng thành công");
//           queryClient.invalidateQueries({
//             queryKey: ['in-cart']
//           })
//         }
//         }
//         // const response = await fetch('https://egoflask-be.azurewebsites.net/api/CustomProduct', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Accept': '*/*',
//         //     'Content-Type': 'application/json-patch+json',
//         //   },
//         //   body: JSON.stringify({
//         //     topComponentId: top.componentId,
//         //     bodyComponentId: body.componentId,
//         //     strapComponentId: strap ? strap.componentId : null,
//         //     engrave: engrave ? engrave : null,
//         //     engravePosition: engravePosition ? engravePosition : null,
//         //     isGift: isGift
//         //   }),
//         // });

//         // if (!response.ok) {
//         //   throw new Error('Failed to add product to cart');
//         // }

//         // const data = await response.json();
//         // console.log('Product added to custom product:', data);



//         // const addToCartResponse = await fetch('https://egoflask-be.azurewebsites.net/api/Order/add-to-cart', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Accept': '*/*',
//         //     'Content-Type': 'application/json',
//         //     'Authorization': `Bearer ${profile.data?.user?.token}`,
//         //   },
//         //   body: JSON.stringify({
//         //     productId: data.productId, 
//         //     quantity: 1 
//         //   }),
//         // });

//         // if (!addToCartResponse.ok) {
//         //   throw new Error('Failed to add to cart');
//         // }


//       } catch (error) {
//         console.error("Error:", error);
//         message.error("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau.");
//       }
//     }
//   };



//   return (
//     <main className="lg:mt-[--m-header-top] xl:px-8 pb-[--m-footer-bottom]">
//       <div className="flex flex-col items-center justify-center">
//         <div className="flex flex-1 w-full items-center justify-center">
//           <div className="border-[3px] border-[#0055C3] rounded-xl w-[700px] flex flex-col items-center justify-center gap-4 py-6 px-10 mr-14">
//             <img src="/images/BigLogo.png?v=1" alt="Logo" className="aspect-[157/45] w-[157px] h-[45px]" />
//             <div className="self-start cursor-pointer flex flex-col gap-3 w-full">
//               {_.map(options, (option, index) => (
//                 <div key={index} className="flex flex-col w-full">
//                   <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleOptionClick(option.value)}>
//                     <IoColorFillOutline className="w-6 h-6 text-[#0055C3]" />
//                     <span className="text-base text-black">{option.name}</span>
//                   </div>
//                   {active === option.value && (
//                     <div className="grid grid-cols-8 mt-2">
//                       {_.map(componentList, (component, idx) => (
//                         <div
//                           key={idx}
//                           className={`w-8 h-8 cursor-pointer rounded-full ${(option.value === "top" && top?.color === component.color) ||
//                               (option.value === "body" && body?.color === component.color) ||
//                               (option.value === "strap" && strap?.color === component.color)
//                               ? "border-2 border-black"
//                               : ""
//                             }`}
//                           style={{ backgroundColor: component.color }}
//                           onClick={() => handleColorSelect(option.value, component)} // cập nhật component khi người dùng chọn
//                         />
//                       ))}
//                     </div>
//                   )}
//                   {index !== options.length - 1 && <div />}
//                 </div>
//               ))}
//               <div className="w-full border-b-2 border-[#E6E6E0] pb-4">
//                 <div className="flex items-center gap-2 cursor-pointer">
//                   <IoAddCircleSharp className="w-6 h-6 text-[#0055C3]" />
//                   <span className="text-base text-black">Khắc laser</span>
//                   <span className="ml-auto text-sm text-black">+ 50.000 VND</span>
//                 </div>
//               </div>

//               <div className="py-2">
//                 <span className="text-base text-black">Vị trí khắc:</span>
//                 <div className="ml-4 flex flex-col gap-2 text-sm text-black">
//                   <label>
//                     <input
//                       type="radio"
//                       name="vi-tri-khac"
//                       className="mr-2"
//                       value="top"
//                       onChange={handleEngravePositionChange}
//                     /> Ở trên
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="vi-tri-khac"
//                       className="mr-2"
//                       value="middle"
//                       onChange={handleEngravePositionChange}
//                     /> Ở giữa
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="vi-tri-khac"
//                       className="mr-2"
//                       value="bottom"
//                       onChange={handleEngravePositionChange}
//                     /> Ở dưới
//                   </label>
//                 </div>
//               </div>

//               <div className="py-2">
//                 <label className="text-sm text-black">Nhập nội dung (tối đa 8 ký tự):</label>
//                 <input
//                   type="text"
//                   className="w-full mt-1 border border-[#E6E6E0] p-2"
//                   maxLength={8}
//                   value={engrave}
//                   onChange={handleEngraveChange}
//                 />
//               </div>


//               <div className="border-b-2 border-[#E6E6E0] w-full py-2">
//                 <div className="flex items-center gap-2 cursor-pointer">
//                   <input type="radio" name="option" className="mr-2" onChange={() => setisGift(true)} />
//                   <span className="text-base text-black">Gói quà</span>
//                 </div>
//               </div>

//             </div>
//           </div>

//           <div className="flex flex-col w-full items-center justify-center">
//             <h4 className="text-[20px] leading-5 text-black font-bold mt-10">
//               Thiết kế chiếc bình giữ nhiệt của riêng bạn
//             </h4>
//             <div uk-slider="sets: true; finite: true;">
//               <div className="uk-position-relative">
//                 <div className="uk-slider-container">
//                   <div className="uk-slider-items uk-child-width-1-5 uk-grid">
//                     {_.map(componentList, (component, index) => (
//                       <div
//                         key={index}
//                         className={`uk-position-relative cursor-pointer ${(top && top.imageUrl === component.imageUrl) ||
//                             (body && body.imageUrl === component.imageUrl) ||
//                             (strap && strap.imageUrl === component.imageUrl)
//                             ? "opacity-100"
//                             : "opacity-30"
//                           }`}
//                         onClick={() => handleColorSelect(active, component)}
//                       >
//                         <img src={component.imageUrl} alt={component.name} className="object-cover h-[500px]" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <a
//                   className="uk-position-center-left-out"
//                   href=""
//                   uk-slider-item="previous"
//                 >
//                   <IoArrowBackCircle className="w-8 h-14 text-[#232529] cursor-pointer" />
//                 </a>
//                 <a
//                   className="uk-position-center-right-out"
//                   href=""
//                   uk-slider-item="next"
//                 >
//                   <IoArrowForwardCircle className="w-8 h-14 text-[#232529] cursor-pointer" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>


//         <div className="flex justify-end mt-8 gap-10">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             onClick={handleReview}
//           >
//             Review sản phẩm
//           </button>
//           <button
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//             onClick={handleReset}
//           >
//             Reset
//           </button>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//             onClick={handleAddToCart}
//           >
//             Thêm vào giỏ hàng
//           </button>
//         </div>

//         <ReviewModal
//           top={top}
//           body={body}
//           strap={strap}
//           engrave={engrave}
//           engravePosition={engravePosition}
//           onClose={handleCloseModal}
//           isOpen={isReviewModalOpen}
//         />
//         <SubFooter />
//       </div>
//     </main>
//   );
// }
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { IoAddCircleSharp, IoArrowBackCircle, IoArrowForwardCircle, IoColorFillOutline } from "react-icons/io5";
import { SubFooter } from "~/components";
import { BottleComponent } from "~/data/types";
import { ReviewModal } from "~/components";
import { addToCart, createCustomProduct, useGetComponentList } from "~/data";
import { useGetProfile } from "~/data";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { json, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect(`/login?message=${encodeURIComponent("Vui lòng đăng nhập để tiếp tục")}&type=error`);
  }
  return json({}, { status: 200 });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Thiết kế" },
    {
      property: "og:title",
      content: "Thiết kế bình nước theo ý bạn",
    },
    {
      name: "description",
      content: "Thiết kế bình nước theo ý bạn",
    },
  ];
};

const options = [
  { name: "Thân bình", value: "body" },
  { name: "Nắp bình", value: "top" },
  { name: "Quai bình", value: "strap" },
];

export default function Design() {
  const [active, setActive] = useState("body");
  const [top, setTop] = useState<BottleComponent | null>(null);
  const [body, setBody] = useState<BottleComponent | null>(null);
  const [strap, setStrap] = useState<BottleComponent | null>(null);
  const [engrave, setEngrave] = useState<string>("");
  const [engravePosition, setEngravePosition] = useState<string>("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGift, setisGift] = useState(false);
  const component = useGetComponentList(active);
  const queryClient = useQueryClient();
  const componentList = useMemo(() => _(component.data).orderBy(it => it.name, "asc").value(), [component.data]);

  const profile = useGetProfile();

  const handleOptionClick = (value: string) => setActive(value);
  const handleEngraveChange = (event: React.ChangeEvent<HTMLInputElement>) => setEngrave(event.target.value);
  const handleEngravePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => setEngravePosition(event.target.value);

  const handleColorSelect = (optionValue: string, component: BottleComponent) => {
    if (optionValue === "top") setTop(component);
    else if (optionValue === "body") setBody(component);
    else if (optionValue === "strap") setStrap(component);
  };

  const handleReview = () => setIsReviewModalOpen(true);
  const handleCloseModal = () => setIsReviewModalOpen(false);
  const handleReset = () => {
    setTop(null);
    setBody(null);
    setStrap(null);
    setEngrave("");
    setEngravePosition("");
  };

  const handleAddToCart = async () => {
    if (!top || !body || !strap) {
      message.warning("Vui lòng chọn cả nắp, thân và quai bình.");
    } else {
      try {
        const response = await createCustomProduct(profile.data?.user?.token || "", {
          topComponentId: top?.componentId,
          bodyComponentId: body?.componentId,
          strapComponentId: strap?.componentId,
          engrave: engrave || null,
          engravePosition: engravePosition || null,
          isGift: isGift,
        });

        if (response) {
          const addToCartResponse = await addToCart(profile.data?.user?.token || "", {
            productId: response.productId,
            quantity: 1,
          });

          if (addToCartResponse) {
            message.success("Thêm vào giỏ hàng thành công");
            queryClient.invalidateQueries({ queryKey: ["in-cart"] });
          }
        }
      } catch (error) {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <main className="lg:mt-[--m-header-top] xl:px-8 pb-[--m-footer-bottom]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-6 lg:gap-14 lg:mt-auto mt-6  ">
         
          <div className="border-[3px] border-[#0055C3] rounded-xl w-full max-w-md lg:max-w-xl flex flex-col items-center justify-center gap-4 py-6 px-4 sm:px-10">
            <img src="/images/BigLogo.png?v=1" alt="Logo" className="aspect-[157/45] w-[120px] h-[40px] sm:w-[157px] sm:h-[45px]" />
            <div className="self-start cursor-pointer flex flex-col gap-3 w-full ">
              {_.map(options, (option, index) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleOptionClick(option.value)}>
                    <IoColorFillOutline className="w-6 h-6 text-[#0055C3]" />
                    <span className="text-sm sm:text-base text-black">{option.name}</span>
                  </div>
                  {active === option.value && (
                    <div className="grid grid-cols-6 sm:grid-cols-8 mt-2 gap-2 ">
                      {_.map(componentList, (component, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 sm:w-8 sm:h-8 cursor-pointer rounded-full ${(option.value === "top" && top?.color === component.color) || (option.value === "body" && body?.color === component.color) || (option.value === "strap" && strap?.color === component.color) ? "border-2 border-black" : ""}`}
                          style={{ backgroundColor: component.color }}
                          onClick={() => handleColorSelect(option.value, component)}
                        />
                      ))}
                    </div>
                  )}
                  {index !== options.length - 1 && <div />}
                </div>
              ))}
              <div className="w-full border-b-2 border-[#E6E6E0] pb-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <IoAddCircleSharp className="w-6 h-6 text-[#0055C3]" />
                  <span className="text-sm sm:text-base text-black">Khắc laser</span>
                  {/* <span className="ml-auto text-xs sm:text-sm text-black">+ 50.000 VND</span> */}
                </div>
              </div>

              <div className="py-2">
                <span className="text-sm sm:text-base text-black">Vị trí khắc:</span>
                <div className="ml-4 flex flex-col gap-2 text-xs sm:text-sm text-black">
                  <label><input type="radio" name="vi-tri-khac" className="mr-2" value="top" onChange={handleEngravePositionChange} /> Ở trên</label>
                  <label><input type="radio" name="vi-tri-khac" className="mr-2" value="middle" onChange={handleEngravePositionChange} /> Ở giữa</label>
                  <label><input type="radio" name="vi-tri-khac" className="mr-2" value="bottom" onChange={handleEngravePositionChange} /> Ở dưới</label>
                </div>
              </div>

              <div className="py-2">
                <label className="text-xs sm:text-sm text-black">Nhập nội dung (tối đa 8 ký tự):</label>
                <input type="text" className="w-full mt-1 border border-[#E6E6E0] p-2 text-xs sm:text-sm" maxLength={8} value={engrave} onChange={handleEngraveChange} />
              </div>

              <div className="border-b-2 border-[#E6E6E0] w-full py-2">
                <div className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="option" className="mr-2" onChange={() => setisGift(true)} />
                  <span className="text-sm sm:text-base text-black">Gói quà</span>
                </div>
              </div>
            </div>
          </div>

        
          <div className="flex flex-col w-full items-center justify-center mt-12">
            <h4 className="text-[18px] sm:text-[20px] leading-5 text-black font-bold mt-4 lg:mt-10">Thiết kế chiếc bình giữ nhiệt của riêng bạn</h4>
            <div uk-slider="sets: true; finite: true;">
              <div className="uk-position-relative">
                <div className="uk-slider-container">
                  <div className="uk-slider-items uk-child-width-1-5 uk-grid ml-16">
                    {_.map(componentList, (component, index) => (
                      <div key={index} className={`uk-position-relative cursor-pointer ${(top && top.imageUrl === component.imageUrl) || (body && body.imageUrl === component.imageUrl) || (strap && strap.imageUrl === component.imageUrl) ? "opacity-100" : "opacity-30"}`} onClick={() => handleColorSelect(active, component)}>
                        <img src={component.imageUrl} alt={component.name} className="object-cover h-[300px] sm:h-[400px] md:h-[500px] " />
                      </div>
                    ))}
                  </div>
                </div>
                <a className="uk-position-center-left-out" href="" uk-slider-item="previous"><IoArrowBackCircle className="w-8 h-10 sm:h-14 text-[#232529] cursor-pointer" /></a>
                <a className="uk-position-center-right-out" href="" uk-slider-item="next"><IoArrowForwardCircle className="w-8 h-10 sm:h-14 text-[#232529] cursor-pointer" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end mt-6 lg:mt-8 gap-4 lg:gap-10">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-sm" onClick={handleReview}>Review sản phẩm</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base" onClick={handleReset}>Reset</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm sm:text-base" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
        </div>

        <ReviewModal top={top} body={body} strap={strap} engrave={engrave} engravePosition={engravePosition} onClose={handleCloseModal} isOpen={isReviewModalOpen} />
        <SubFooter />
      </div>
    </main>
  );
}
