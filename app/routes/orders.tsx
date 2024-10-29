// import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
// import { Link, Outlet, useLocation } from "@remix-run/react";
// import _ from "lodash";
// import { useMemo } from "react";
// import { ProfileSidebar, SubFooter } from "~/components";
// import { formatMoney } from "~/components/utils";
// import { useGetAllOrder, useGetProfile } from "~/data";
// import { authenticator } from "~/services/auth.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   let user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     return redirect("/login");
//   }
//   return json({}, { status: 200 });
// }

// const Orders = () => {
//   const profile = useGetProfile();
//   const myOrders = useGetAllOrder(profile.data?.user?.token || "");
//   const location = useLocation();

//   const sortMyOrders = useMemo(() => {
//     return _(myOrders.data)
//       .orderBy((it) => it.updatedAt, "desc")
//       .value();
//   }, [myOrders.data]);

//   // const cartItems = useMemo(() => {
//   //   if (!myOrders.data) {
//   //     return [];
//   //   }
//   //   return _.map(getInCart.data, (item) => {
//   //     const { orderDetailId, productImageURL, productName, unitPrice, quantity } = item;
//   //     let topImage = '';
//   //     let bodyImage = '';
//   //     let strapImage = '';

//   //     if (productImageURL) {
//   //       const images = splitProductImageURLs(productImageURL);
//   //       topImage = images.top;
//   //       bodyImage = images.body;
//   //       strapImage = images.strap;
//   //     }

//   //     return {
//   //       id: orderDetailId,
//   //       topImage,
//   //       bodyImage,
//   //       strapImage,
//   //       name: productName,
//   //       price: unitPrice,
//   //       quantity,
//   //       orderDetailId,
//   //     };
//   //   })
//   // }, [getInCart.data]);

//   const productList = [
//     {
//       id: 1,
//       name: "Graceful",
//       img: "/images/products/bottle-1.png",
//       price: "100.000",
//     },
//     {
//       id: 2,
//       name: "Gracious",
//       img: "/images/products/bottle-2.png",
//       price: "150.000",
//     },
//     {
//       id: 3,
//       name: "Creative",
//       img: "/images/products/bottle-3.png?v=1",
//       price: "200.000",
//     },
//     {
//       id: 4,
//       name: "Dynamic",
//       img: "/images/products/bottle-4.png",
//       price: "250.000",
//     },

//   ];
//   return (
//     <main className="mt-[--m-header-top] ">
//       <div className="grid grid-cols-12 w-full space-x-7 pr-8">
//         <div className="col-span-2  border-[#e8e8e4] border-2 rounded-r-3xl w-full  ">
//           <ProfileSidebar />
//         </div>
//         <Outlet />
//         {location.pathname === "/orders" && (
//           <div className="col-span-10 border-[#0055C3] my-9 border-2   ">
//             <table className="w-full">
//               <thead className="bg-[#0055C3] text-white">
//                 <tr>
//                   <th>Mã đơn hàng</th>
//                   <th>Tổng tiền</th>
//                   <th>Địa chỉ nhận hàng</th>
//                   <th>Tình trạng</th>
//                   <th>Chi tiết đơn hàng</th>
//                 </tr>
//               </thead>
//               <tbody className="text-black">
//                 {_.map(sortMyOrders, (order, index) => (
//                   <tr key={index} className="border-b-2 justify-center items-center">
//                     <th>#{order.orderId}</th>
//                     <td className="flex justify-center items-center h-full">
//                       {/* <div className="1/3 p-4 ">
//                     <div className="p-4  bg-[#e8e8e4]">
//                       <img
//                         className="w-[90px] h-[160px] relative"
//                         // src={order.img}
//                         alt={order.orderId}
//                       />
//                     </div>

//                   </div> */}
//                       <div className="w-2/3">
//                         <div className="p-3 space-y-2">
//                           {/* <div className="flex justify-between ">
//                         <div>
//                           <p className="text-black">
//                             Bình giữ nhiệt
//                             <span className="font-semibold"> GRACEFUL</span>
//                           </p>
//                         </div>
//                         <div className="flex space-x-4">
//                           <p className="text-black">{formatMoney(order.finalAmount)}</p>
//                         </div>
//                       </div>
//                       <p className="font-semibold text-black">x1</p> */}
//                           <div>
//                             {/* <p className="">Dịch vụ đi kèm</p>

//                         <div className="flex justify-between pl-3">
//                           <div>
//                             <p className="">
//                               Viết thư tay:{" "}
//                               <span className="font-semibold">
//                                 Sinh nhật vui vẻ !
//                               </span>
//                             </p>
//                             <p className="">Gói quà</p>
//                           </div>

//                           <div>
//                             <div className="flex space-x-4">
//                               <p className="text-black">?VND</p>
//                             </div>
//                             <div className="flex space-x-4">
//                               <p className="text-black">?VND</p>
//                             </div>
//                           </div>
//                         </div> */}
//                             <div className="border-b-2 border-[#0055C3] flex justify-center items-center">
//                               {/* <p className="text-[#0055C3] font-semibold pt-2">
//                             Tổng tiền
//                           </p> */}

//                               <p className="text-[#0055C3] font-semibold pt-2">
//                                 {formatMoney(_.sumBy(order.orderDetails, (it) => it.totalPrice))}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </td>{" "}
//                     <td>
//                       <div className="min-w-[226px] h-[132px]">
//                         <div className="space-y-2">
//                           <p className="font-semibold text-black">{order.customerName}</p>
//                           <p>{order.customerPhone}</p>
//                           <p className="line-clamp-3">
//                             {order.customerAddress}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       {order.transactionStatus === 'PAID' ? (
//                         <p>{order.status === 'PENDING' ? 'Đang chờ duyệt đơn' :
//                           order.status === 'SHIPPING' ? "Đang vận chuyển" :
//                             order.status === 'CANCELLED' ? "Đã hủy" :
//                               "Đã giao hàng"}</p>
//                       ) : (
//                         <p>{order.transactionStatus === 'CANCELLED' ? 'Đã hủy' : 'Đang chờ thanh toán'}</p>
//                       )}
//                     </td>
//                     <td>
//                       <div className="flex justify-center">
//                         <Link to={`/orders/${order.orderId}`} className="bg-[#0055C3] text-white hover:text-white p-2 rounded-lg">
//                           Chi tiết
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <div>
//         <SubFooter />
//       </div>
//     </main>
//   );
// };

// export default Orders;
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { format } from "date-fns";
import _ from "lodash";
import { useMemo } from "react";
import { ProfileSidebar, SubFooter } from "~/components";
import { formatMoney } from "~/components/utils";
import { useGetAllOrder, useGetProfile } from "~/data";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect(`/login?message=${encodeURIComponent("Bạn cần đăng nhập để xem đơn hàng")}&type=error`);
  }
  return json({}, { status: 200 });
}

const Orders = () => {
  const profile = useGetProfile();
  const myOrders = useGetAllOrder(profile.data?.user?.token || "");
  const location = useLocation();

  const sortMyOrders = useMemo(() => {
    return _(myOrders.data)
      .orderBy((it) => it.updatedAt, "desc")
      .value();
  }, [myOrders.data]);

  return (
    <main className="mt-[--m-header-top]">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full space-y-4 lg:space-y-0 lg:space-x-7 lg:pr-8">
        {/* Sidebar giữ nguyên trên máy tính và responsive trên điện thoại */}
        <div className="lg:col-span-2 border-[#e8e8e4] border-2 rounded-r-3xl w-full">
          <ProfileSidebar />
        </div>
        <Outlet />
        {location.pathname === "/orders" && (
          <div className="lg:col-span-10 border-[#0055C3] my-9 border-2 p-4 lg:p-6">
            {/* Thêm class overflow-x-auto cho phép cuộn ngang */}
            <div className="overflow-x-auto">
              {myOrders.isLoading && <img src="/icons/loading-2.svg" alt="loading" className="w-10 h-10 sm:w-12 sm:h-12 justify-self-center" />}
              <table className="min-w-[700px] w-full text-sm lg:text-base table-auto">
                <thead className="bg-[#0055C3] text-white">
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Tổng tiền</th>
                    <th>Địa chỉ nhận hàng</th>
                    <th>Tình trạng</th>
                    <th>Ngày đặt hàng</th>
                    <th>Ngày cập nhật</th>
                    <th>Trạng thái thanh toán</th>
                    <th>Phương thức thanh toán</th>
                    <th>Chi tiết đơn hàng</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {_.map(sortMyOrders, (order, index) => (
                    <tr key={index} className="border-b-2 justify-center items-center">
                      <th>#{order.orderId}</th>
                      <td className="flex justify-center items-center h-full">
                        {/* Cột chứa thông tin tổng tiền đơn hàng */}
                        <div className="w-full lg:w-2/3">
                          <div className="p-3 space-y-2">
                            <div className="border-b-2 border-[#0055C3] flex justify-center items-center">
                              <p className="text-[#0055C3] font-semibold pt-2">
                                {formatMoney(_.sumBy(order.orderDetails, (it) => it.totalPrice))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="w-auto h-auto pb-4">
                          <div className="space-y-2">
                            <p className="font-semibold text-black">{order.customerName}</p>
                            <p>{order.customerPhone}</p>
                            <p className="line-clamp-3">{order.customerAddress}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {order.transactionStatus === 'PAID' ? (
                          <p>
                            {order.status === 'PENDING'
                              ? 'Đang chờ duyệt đơn'
                              : order.status === 'SHIPPING'
                                ? 'Đang vận chuyển'
                                : order.status === 'CANCELLED'
                                  ? 'Đã hủy'
                                  : 'Đã giao hàng'}
                          </p>
                        ) : order.transactionStatus === 'CANCELLED' ? (
                          <p>Đã hủy</p>
                        ) : order.transactionStatus === null && (
                          // cho case COD
                          <p>
                            {order.status === 'PENDING'
                              ? 'Đang chờ duyệt đơn'
                              : order.status === 'SHIPPING'
                                ? 'Đang vận chuyển'
                                : order.status === 'CANCELLED'
                                  ? 'Đã hủy'
                                  : 'Đã giao hàng'}
                          </p>
                        )}
                      </td>
                      <td>{format(order.createdAt, "HH:mm:ss dd/MM/yyyy")}</td>
                      <td>{format(order.updatedAt, "HH:mm:ss dd/MM/yyyy")}</td>
                      <td className="text-center">
                        {order.transactionStatus === 'PAID' ? (
                          <p>Đã thanh toán</p>
                        ) : order.transactionStatus === 'CANCELLED' ? (
                          <p>Đã hủy</p>
                        ) : (
                          <p>Chưa thanh toán</p>
                        )}
                      </td>
                      <td className="text-center">{order.paymentMethod || "Chưa thanh toán"}</td>
                      <td>
                        <div className="flex justify-center">
                          <Link to={`/orders/${order.orderId}`} className="bg-[#0055C3] text-white hover:text-white p-2 rounded-lg text-xs lg:text-base">
                            Chi tiết
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
};

export default Orders;
