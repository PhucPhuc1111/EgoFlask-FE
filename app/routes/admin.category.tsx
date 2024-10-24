// import { Image, Pagination, PaginationProps } from "antd";
// import _ from "lodash";
// import { useMemo, useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import AddProductModal from "~/components/ProductModal/AddProductModal";
// import DeleteProductModal from "~/components/ProductModal/DeleteProductModal";
// import UpdateProductModal from "~/components/ProductModal/UpdateProductModal";
// import { useGetAllProducts, useGetProfile } from "~/data";

// export const handle = {
//   hideHeader: true,
//   hideFooter: true,
// };

// export default function AdminCategory() {
  
//   const { data: profile, isLoading: profileLoading, isError } = useGetProfile();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState<number>(100);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null); 

//   const { data: products, refetch } = useGetAllProducts(currentPage, pageSize, "");

//   const productData = useMemo(() => {
//     if (!products) return [];

//     return _(products)
//       .orderBy((it) => it.createAt, "desc")
//       .filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .value();
//   }, [products, pageSize, currentPage, searchTerm]);

//   const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
//     current,
//     pageSize
//   ) => {
//     setCurrentPage(current);
//     setPageSize(pageSize);
//   };

//   const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
//     setCurrentPage(pageNumber);
//     setPageSize(pageSize);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product); 
//   };

//   if (isError) {
//     return <div>Error loading profile data.</div>;
//   }

//   return (
//     <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
//       <div className="flex flex-row items-center justify-between">
//         <div className="relative">
//           <IoSearchOutline className="absolute top-4 left-2 w-6 h-6" />
//           <input
//             type="search"
//             className="rounded-md w-[463px] h-[57px] placeholder:pl-0 pl-10"
//             placeholder="Tìm kiếm"
//             name="Search"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//         <div>
//           <AddProductModal /> 
//         </div>
//       </div>

//       <div className="my-2">
//         <table className="w-full border-2">
//           <thead className="bg-[#0055C3] text-white text-center border-2">
//             <tr>
//               <th className="border-2 border-[#0055C3]">Mã sản phẩm</th>
//               <th className="border-2 border-[#0055C3]">Tên</th>
//               <th className="border-2 border-[#0055C3]">Hình ảnh</th>
//               <th className="border-2 border-[#0055C3]">Mô tả</th>
//               <th className="border-2 border-[#0055C3]">Hướng dẫn bảo quản</th>
//               <th className="border-2 border-[#0055C3]">Giá Tiền</th>
//               <th className="border-2 border-[#0055C3]">Kho</th>
//               <th className="border-2 border-[#0055C3]">Cập nhật</th>
//             </tr>
//           </thead>
//           <tbody className="text-black text-center border-2">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-3">
//                   <p className="text-[#0055C3]">Loading...</p>
//                 </td>
//               </tr>
//             ) : (
//               _.map(productData, (product) => (
//                 <tr key={product.productId}>
//                   <th className="border-2 border-[#0055C3] py-3">
//                     #{product.productId}
//                   </th>
//                   <td className="border-2 border-[#0055C3] p-6">
//                     {product.name}
//                   </td>
//                   <td className="border-2 border-[#0055C3] p-6">
//                     <div className="flex justify-center bg-[#dbdbcf] w-[90px] h-[152px]">
//                       <Image
//                         src={product.imageUrl}
//                         alt={product.name}
//                         width={90}
//                         height={152}
//                       />
//                     </div>
//                   </td>
//                   <td className="border-2 border-[#0055C3] px-3">
//                     <div className="flex justify-center bg-[#dbdbcf] w-full">
//                       <Image src="/images/description.png" alt="" />
//                     </div>
//                   </td>
//                   <td className="border-2 border-[#0055C3] px-3">
//                     <div className="flex justify-center bg-[#dbdbcf] w-full">
//                       <Image src="/images/description.png" alt="" />
//                     </div>
//                   </td>
//                   <td className="border-2 border-[#0055C3] p-6">
//                     {product.price} VND
//                   </td>
//                   <td className="border-2 border-[#0055C3] p-6">
//                     {product.inventory}
//                   </td>
//                   <td className="border-2 border-[#0055C3] p-6">
//                     <div className="flex flex-col">
//                       <div>
//                         <UpdateProductModal productId={product.productId} productData={product} />
//                       </div>
//                       <div>
//                         <DeleteProductModal
//                           productId={product.productId}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         <Pagination
//           className="mt-4"
//           align="center"
//           showSizeChanger
//           onChange={onChange}
//           onShowSizeChange={onShowSizeChange}
//           defaultCurrent={currentPage}
//           total={500}
//         />
//       </div>
//     </main>
//   );
// }
import { Image, Pagination, PaginationProps } from "antd";
import _ from "lodash";
import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AddProductModal from "~/components/ProductModal/AddProductModal";
import DeleteProductModal from "~/components/ProductModal/DeleteProductModal";
import UpdateProductModal from "~/components/ProductModal/UpdateProductModal";
import { useGetAllProducts, useGetProfile } from "~/data";

export const handle = {
  hideHeader: true,
  hideFooter: true,
};

export default function AdminCategory() {
  const { data: profile, isLoading: profileLoading, isError } = useGetProfile();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, refetch } = useGetAllProducts(currentPage, pageSize, "");

  const productData = useMemo(() => {
    if (!products) return [];

    return _(products)
      .orderBy((it) => it.createAt, "desc")
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .value();
  }, [products, pageSize, currentPage, searchTerm]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <IoSearchOutline className="absolute top-3 sm:top-4 left-3 w-5 sm:w-6 h-5 sm:h-6" />
          <input
            type="search"
            className="rounded-md w-full sm:w-[463px] h-[45px] sm:h-[57px] pl-12 sm:pl-10"
            placeholder="Tìm kiếm"
            name="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <AddProductModal />
        </div>
      </div>

      <div className="my-4">
        {/* Table for larger screens (sm and above) */}
        <div className="hidden sm:block">
          <table className="w-full border-2">
            <thead className="bg-[#0055C3] text-white text-center border-2">
              <tr>
                <th className="border-2 border-[#0055C3]">Mã sản phẩm</th>
                <th className="border-2 border-[#0055C3]">Tên</th>
                <th className="border-2 border-[#0055C3]">Hình ảnh</th>
                <th className="border-2 border-[#0055C3]">Mô tả</th>
                <th className="border-2 border-[#0055C3]">Hướng dẫn bảo quản</th>
                <th className="border-2 border-[#0055C3]">Giá Tiền</th>
                <th className="border-2 border-[#0055C3]">Kho</th>
                <th className="border-2 border-[#0055C3]">Cập nhật</th>
              </tr>
            </thead>
            <tbody className="text-black text-center border-2">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-3">
                    <p className="text-[#0055C3]">Loading...</p>
                  </td>
                </tr>
              ) : (
                _.map(productData, (product) => (
                  <tr key={product.productId}>
                    <th className="border-2 border-[#0055C3] py-3">
                      #{product.productId}
                    </th>
                    <td className="border-2 border-[#0055C3] p-6">
                      {product.name}
                    </td>
                    <td className="border-2 border-[#0055C3] p-6">
                      <div className="flex justify-center bg-[#dbdbcf] w-[90px] h-[152px]">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={90}
                          height={152}
                        />
                      </div>
                    </td>
                    <td className="border-2 border-[#0055C3] px-3">
                      <div className="flex justify-center bg-[#dbdbcf] w-full">
                        <Image src="/images/description.png" alt="" />
                      </div>
                    </td>
                    <td className="border-2 border-[#0055C3] px-3">
                      <div className="flex justify-center bg-[#dbdbcf] w-full">
                        <Image src="/images/description.png" alt="" />
                      </div>
                    </td>
                    <td className="border-2 border-[#0055C3] p-6">
                      {product.price} VND
                    </td>
                    <td className="border-2 border-[#0055C3] p-6">
                      {product.inventory}
                    </td>
                    <td className="border-2 border-[#0055C3] p-6">
                      <div className="flex flex-col">
                        <div>
                          <UpdateProductModal productId={product.productId} productData={product} />
                        </div>
                        <div>
                          <DeleteProductModal productId={product.productId} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stacked layout for screens smaller than sm */}
        <div className="block sm:hidden">
          {_.map(productData, (product) => (
            <div key={product.productId} className="border-2 mb-4 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="font-bold">Mã sản phẩm:</span> #{product.productId}
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Tên:</span> {product.name}
              </div>
              <div className="my-2">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto"
                  width={90}
                  height={152}
                />
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Giá:</span> {product.price} VND
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Kho:</span> {product.inventory}
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <UpdateProductModal productId={product.productId} productData={product} />
                <DeleteProductModal productId={product.productId} />
              </div>
            </div>
          ))}
        </div>

        <Pagination
          className="mt-4"
          align="center"
          showSizeChanger
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={currentPage}
          total={500}
        />
      </div>
    </main>
  );
}
