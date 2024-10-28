// import React, { useMemo, useState } from "react";
// import { useGetProfile, useGetAllAccount } from "~/data";
// import { Link } from "@remix-run/react";
// import { format } from "date-fns";
// import { Pagination, PaginationProps } from 'antd';
// import _ from "lodash";
// import { IoSearchOutline } from "react-icons/io5";

// export const handle = {
//   hideHeader: true,
//   hideFooter: true,
// };

// export default function AdminCustomer() {
//   const { data: profile, isLoading: profileLoading, isError } = useGetProfile();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState<number>(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const accounts = useGetAllAccount(profile?.user?.token || "", currentPage, pageSize);

//   const accountData = useMemo(() => {
//     if (!accounts.data) return [];

//     return _(accounts.data)
//       .orderBy(it => it.createAt, 'desc')
//       .filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       .value();
//   }, [accounts.data, pageSize, currentPage, searchTerm]);

//   const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
//     setCurrentPage(current);
//     setPageSize(pageSize);
//   };

//   const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
//     setCurrentPage(pageNumber);
//     setPageSize(pageSize);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   if (isError) {
//     return <div>Error loading profile data.</div>;
//   }

//   return (
//     <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
//       <div className="flex flex-row items-center justify-between">
//         <div>
//           {accounts.data?.length.toLocaleString() || 0} khách hàng
//         </div>
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
//       </div>

//       <div className="my-2">
//         <table className="w-full border-2">
//           <thead className="bg-[#0055C3] text-white text-center border-2">
//             <tr>
//               <th className="border-2 border-[#0055C3]">#ID</th>
//               <th className="border-2 border-[#0055C3]">Tên</th>
//               <th className="border-2 border-[#0055C3]">Email</th>
//               <th className="border-2 border-[#0055C3]">Ngày tạo</th>
//               <th className="border-2 border-[#0055C3]">Chi tiết</th>
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
//               _.map(accountData, (customer) => (
//                 <tr key={customer.accountId}>
//                   <th className="border-2 border-[#0055C3] py-3">#{customer.accountId}</th>
//                   <td className="border-2 border-[#0055C3]">{customer.name}</td>
//                   <td className="border-2 border-[#0055C3]">{customer.email}</td>
//                   <td className="border-2 border-[#0055C3]">{format(customer.createAt, 'HH:mm dd/MM/yyyy')}</td>
//                   <td className="border-2 border-[#0055C3]">
//                     <Link to={`/admin/customer/${customer.accountId}`}>
//                       <button className="border rounded-md w-24 h-8 bg-[#0055C3] text-white hover:bg-white hover:text-[#0055C3]">
//                         Chi tiết
//                       </button>
//                     </Link>
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
import React, { useMemo, useState } from "react";
import { useGetProfile, useGetAllAccount } from "~/data";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { Image, Pagination, PaginationProps } from "antd";
import _ from "lodash";
import { IoSearchOutline } from "react-icons/io5";

export const handle = {
  hideHeader: true,
  hideFooter: true,
};

export default function AdminCustomer() {
  const { data: profile, isLoading: profileLoading, isError } = useGetProfile();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const accounts = useGetAllAccount(
    profile?.user?.token || "",
    currentPage,
    pageSize
  );

  const accountData = useMemo(() => {
    if (!accounts.data) return [];

    return _(accounts.data)
      .orderBy((it) => it.createAt, "desc")
      .filter(
        (customer) =>
          (customer.name &&
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (customer.email &&
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .value();
  }, [accounts.data, pageSize, currentPage, searchTerm]);

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

  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <main className="flex-1 pt-32 pb-10 h-full max-h-screen overflow-auto px-8">
      <div className="flex flex-row items-center justify-between">
        <div>{accounts.data?.length.toLocaleString() || 0} khách hàng</div>
        <div className="relative">
          <IoSearchOutline className="absolute top-4 left-2 w-6 h-6" />
          <input
            type="search"
            className="rounded-md w-[463px] h-[57px] placeholder:pl-0 pl-10"
            placeholder="Tìm kiếm"
            name="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="my-2">
        <table className="w-full border-2">
          <thead className="bg-[#0055C3] text-white text-center border-2">
            <tr>
              <th className="border-2 border-[#0055C3]">#ID</th>
              <th className="border-2 border-[#0055C3]">Tên</th>
              <th className="border-2 border-[#0055C3]">Email</th>
              <th className="border-2 border-[#0055C3]">Ngày tạo</th>
              <th className="border-2 border-[#0055C3]">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-black text-center border-2">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  <p className="text-[#0055C3]">Loading...</p>
                </td>
              </tr>
            ) : (
              _.map(accountData, (customer) => (
                <tr key={customer.accountId}>
                  <th className="border-2 border-[#0055C3] py-3">
                    #{customer.accountId}
                  </th>
                  <th className="border-2 border-[#0055C3] py-3 space-x-4  ">
                    <div className="flex  justify-center items-center space-x-2">
                    <Image
                      src={customer.avatar}
                      alt="avatar"
                      width={32}
                      height={32}
                      className=" rounded-full object-cover"
                    />
                    
                      <span>{customer.name}</span>
                      </div>
                 
                  </th>
                  <td className="border-2 border-[#0055C3]">
                    {customer.email}
                  </td>
                  <td className="border-2 border-[#0055C3]">
                    {format(new Date(customer.createAt), "HH:mm dd/MM/yyyy")}
                  </td>
                  <td className="border-2 border-[#0055C3]">
                    <Link to={`/admin/customer/${customer.accountId}`}>
                      <button className="border rounded-md w-24 h-8 bg-[#0055C3] text-white hover:bg-white hover:text-[#0055C3]">
                        Chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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
