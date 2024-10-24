// import { json, LoaderFunctionArgs } from "@remix-run/node";
// import { Link, useLoaderData } from "@remix-run/react";
// import { Image, Table, TableProps } from "antd";
// import _ from "lodash";
// import { useMemo } from "react";
// import { IoArrowBackOutline } from "react-icons/io5";
// import { Model } from "~/components";
// import { formatMoney, splitProductImageURLs } from "~/components/utils";
// import { OrderDetail, useGetAllOrder, useGetProfile } from "~/data";

// export function loader({ params }: LoaderFunctionArgs) {
//   let slug = params.slug;
//   return json({ slug }, { status: 200 });
// }

// export default function OrderDetails() {
//   const { slug } = useLoaderData<typeof loader>();
//   const profile = useGetProfile();
//   const myOrders = useGetAllOrder(profile.data?.user?.token || "");

//   const findOrderDetailsByOrderId = useMemo(() => {
//     return _.find(myOrders.data, (it) => it.orderId === slug)?.orderDetails || [];
//   }, [myOrders.data]);

//   const datasource = useMemo(() => {
//     return _(findOrderDetailsByOrderId)
//       .value();
//   }, [findOrderDetailsByOrderId]);

//   console.log('datasource: ', datasource);

//   const columns: TableProps<OrderDetail>['columns'] = [
//     {
//       title: 'Order Detail Id',
//       dataIndex: 'orderDetailId',
//       key: 'orderDetailId',
//     },
//     {
//       title: 'Tên sản phẩm',
//       dataIndex: 'productName',
//       key: 'productName',
//     },
//     {
//       title: 'Số lượng',
//       dataIndex: 'quantity',
//       key: 'quantity',
//     },
//     {
//       title: 'Ảnh',
//       // dataIndex: 'productImageURL',
//       // key: 'productImageURL',
//       render: (value: OrderDetail) => {
//         if (value.isCustom) {
//           let topImage = '';
//           let bodyImage = '';
//           let strapImage = '';

//           if (value.productImageURL) {
//             const images = splitProductImageURLs(value.productImageURL);
//             topImage = images.top;
//             bodyImage = images.body;
//             strapImage = images.strap;
//           }
//           return <Model
//             topImage={value.head?.imageUrl || topImage}
//             bodyImage={value.body?.imageUrl || bodyImage}
//             strapImage={value.strap?.imageUrl || strapImage}
//             width="150px"
//           />
//         }
//         else {
//           return <Image src={value.productImageURL} alt={value.productName} width={100}/>
//         }
//       }
//     },
//     {
//       title: 'Khắc',
//       dataIndex: 'engrave',
//       key: 'engrave',
//       render: (value: string) => {
//         if (value) {
//           return value;
//         }
//         return 'Không khắc';
//       }
//     },
//     {
//       title: 'Vị trí khắc',
//       dataIndex: 'engravePosition',
//       key: 'engravePosition',
//       render: (value: string) => {
//         if (value) {
//           return value;
//         }
//         return 'Ngẫu nhiên';
//       }
//     },
//     {
//       title: 'Giá',
//       dataIndex: 'unitPrice',
//       key: 'unitPrice',
//       render: (value) => {
//         return formatMoney(value);
//       }
//     },
//   ]
//   return (
//     <div className="col-span-10 space-y-2">
//       <Link to={`/orders`} className="flex items-center">
//         <IoArrowBackOutline />
//         Quay lại
//       </Link>
//       <Table loading={myOrders.isLoading} dataSource={datasource} columns={columns}>
//       </Table>
//     </div>
//   )
// }
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Image, Table, TableProps } from "antd";
import _ from "lodash";
import { useMemo } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Model } from "~/components";
import { formatMoney, splitProductImageURLs } from "~/components/utils";
import { OrderDetail, useGetAllOrder, useGetProfile } from "~/data";

export function loader({ params }: LoaderFunctionArgs) {
  let slug = params.slug;
  return json({ slug }, { status: 200 });
}

export default function OrderDetails() {
  const { slug } = useLoaderData<typeof loader>();
  const profile = useGetProfile();
  const myOrders = useGetAllOrder(profile.data?.user?.token || "");

  const findOrderDetailsByOrderId = useMemo(() => {
    return _.find(myOrders.data, (it) => it.orderId === slug)?.orderDetails || [];
  }, [myOrders.data]);

  const datasource = useMemo(() => {
    return _(findOrderDetailsByOrderId).value();
  }, [findOrderDetailsByOrderId]);

  console.log("datasource: ", datasource);

  const columns: TableProps<OrderDetail>["columns"] = [
    {
      title: "Order Detail Id",
      dataIndex: "orderDetailId",
      key: "orderDetailId",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ảnh",
      render: (value: OrderDetail) => {
        if (value.isCustom) {
          let topImage = "";
          let bodyImage = "";
          let strapImage = "";

          if (value.productImageURL) {
            const images = splitProductImageURLs(value.productImageURL);
            topImage = images.top;
            bodyImage = images.body;
            strapImage = images.strap;
          }
          return (
            <Model
              topImage={value.head?.imageUrl || topImage}
              bodyImage={value.body?.imageUrl || bodyImage}
              strapImage={value.strap?.imageUrl || strapImage}
              width="150px"
            />
          );
        } else {
          return <Image src={value.productImageURL} alt={value.productName} width={100} />;
        }
      },
    },
    {
      title: "Khắc",
      dataIndex: "engrave",
      key: "engrave",
      render: (value: string) => {
        if (value) {
          return value;
        }
        return "Không khắc";
      },
    },
    {
      title: "Vị trí khắc",
      dataIndex: "engravePosition",
      key: "engravePosition",
      render: (value: string) => {
        if (value) {
          return value;
        }
        return "Ngẫu nhiên";
      },
    },
    {
      title: "Giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (value) => {
        return formatMoney(value);
      },
    },
  ];

  return (
    <div className="col-span-10 space-y-2 px-4 md:px-8 py-2">
      <Link to="/orders" className="flex items-center text-sm md:text-base">
        <IoArrowBackOutline className="mr-1" />
        Quay lại
      </Link>
      <div className="overflow-x-auto"> 
        <Table
          className="w-full text-xs md:text-sm lg:text-base"
          loading={myOrders.isLoading}
          dataSource={datasource}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
}
